import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// INTERFACES
import { TasksServiceInterface } from './interfaces/tasks-service.interface';

// SERVICES
import { AmqpService } from '../amqp/amqp.service';

// REPOSITORIES
import { TaskRepository } from '../database/repositories/task.repository';
import { UserRepository } from '../database/repositories/user.repository';

// ENTITIES
import { Task } from '../database/entities/task.entity';

// DTOS
import { NotificationsQueuePayloadDTO } from './dtos/notification-queue-payload.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';

@Injectable()
export class TasksService implements TasksServiceInterface {
	private readonly logger: Logger = new Logger(TasksService.name);

	constructor(
		@Inject(DatabaseProviderEnum.TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository,
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepository,
		private readonly amqpService: AmqpService,
	) {}

	public async createTask(
		userId: string,
		data: CreateTaskDTO,
	): Promise<void> {
		this.logger.log(`Create Task`);

		const user = await this.userRepository.entity.findOne({ id: userId });
		const newTask = this.taskRepository.entity.create({
			...data,
			owner: user,
		});

		await this.taskRepository.entity.persistAndFlush(newTask);
	}

	public async findTasks(userId: string): Promise<Task[]> {
		this.logger.log(`Find Tasks`);

		return await this.taskRepository.entity.find({
			owner: {
				id: userId,
			},
		});
	}

	public async updateTask(
		userId: string,
		taskId: string,
		data: UpdateTaskDTO,
	): Promise<void> {
		this.logger.log(`Update Task`);

		const task = await this.taskRepository.entity.findOne({
			id: taskId,
			owner: {
				id: userId,
			},
		});

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		const updatedTask = wrap(task).assign({
			...data,
			...(data.performTask && { performedDate: new Date() }),
		});
		await this.taskRepository.entity.persistAndFlush(updatedTask);

		if (data.performTask) {
			const payload: NotificationsQueuePayloadDTO = {
				user: {
					id: userId,
				},
				task: {
					id: updatedTask.id,
					performedDate: updatedTask.performedDate,
				},
			};
			this.amqpService.notificationsClient.emit<
				string,
				NotificationsQueuePayloadDTO
			>(process.env.NOTIFICATIONS_QUEUE, payload);
		}
	}
}
