import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

// GUARDS
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

// INTERFACES
import { UserRequestInterface } from '../auth/interfaces/user-request.interface';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';

// ENUMS
import { TasksProviderEnum } from './enums/tasks-provider.enum';

// INTERFACES
import { TasksServiceInterface } from './interfaces/tasks-service.interface';

// DTOS
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('tasks')
export class TasksController {
	constructor(
		@Inject(TasksProviderEnum.TASKS_SERVICE)
		private readonly tasksServices: TasksServiceInterface,
	) {}

	@Post()
	public async createTask(
		@CurrentUser() user: UserRequestInterface,
		@Body() body: CreateTaskDTO,
		@Res() res: Response,
	) {
		await this.tasksServices.createTask(user.id, body);
		return res.status(HttpStatus.CREATED).json();
	}

	@Get()
	public async findTasks(@CurrentUser() user: UserRequestInterface) {
		return this.tasksServices.findTasks(user.id);
	}

	@Put(':id')
	public async updateTask(
		@CurrentUser() user: UserRequestInterface,
		@Param('id') taskId: string,
		@Body() body: UpdateTaskDTO,
	) {
		return this.tasksServices.updateTask(user.id, taskId, body);
	}
}
