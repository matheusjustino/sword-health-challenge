import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// REPOSITORIES
import { TaskRepository } from '../database/repositories/task.repository';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// INTERFACES
import { ManagerTasksServiceInterface } from './interfaces/manager-tasks-service.interface';

// ENTITIES
import { Task } from '../database/entities/task.entity';

// DTOS
import { UpdateTaskDTO } from './dtos/update-task.dto';

@Injectable()
export class ManagerTasksService implements ManagerTasksServiceInterface {
	private readonly logger: Logger = new Logger(ManagerTasksService.name);

	constructor(
		@Inject(DatabaseProviderEnum.TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository,
	) {}

	public async findAll(): Promise<Task[]> {
		this.logger.log(`Find All`);

		return await this.taskRepository.entity.findAll({
			populate: ['owner'],
		});
	}

	public async updateTask(
		taskId: string,
		data: UpdateTaskDTO,
	): Promise<void> {
		this.logger.log(`Update Task`);

		const task = await this.taskRepository.entity.findOne({
			id: taskId,
		});

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		const updatedTask = wrap(task).assign({
			...data,
			...(data.performTask && { performedDate: new Date() }),
		});
		await this.taskRepository.entity.persistAndFlush(updatedTask);
	}

	public async deleteTask(taskId: string): Promise<void> {
		this.logger.log(`Delete Task`);

		const task = await this.taskRepository.entity.findOne({ id: taskId });
		await this.taskRepository.entity.removeAndFlush(task);
	}
}
