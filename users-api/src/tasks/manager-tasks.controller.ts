import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Put,
	UseGuards,
} from '@nestjs/common';

// GUARDS
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

// ENUMS
import { Role } from '../common/enums/role.enum';
import { TasksProviderEnum } from './enums/tasks-provider.enum';

// DECORATORS
import { hasRoles } from '../auth/decorators/roles.decorator';

// INTERFACES
import { ManagerTasksServiceInterface } from './interfaces/manager-tasks-service.interface';

// DTOS
import { UpdateTaskDTO } from './dtos/update-task.dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('manager/tasks')
export class ManagerTasksController {
	constructor(
		@Inject(TasksProviderEnum.MANAGER_TASKS_SERVICE)
		private readonly managerTasksServices: ManagerTasksServiceInterface,
	) {}

	@hasRoles(Role.MANAGER)
	@Get('all')
	public async findAllTasks() {
		return this.managerTasksServices.findAll();
	}

	@hasRoles(Role.MANAGER)
	@Put(':id')
	public async updateTask(
		@Param('id') taskId: string,
		@Body() body: UpdateTaskDTO,
	) {
		return this.managerTasksServices.updateTask(taskId, body);
	}

	@hasRoles(Role.MANAGER)
	@Delete(':id')
	public async deleteTask(@Param('id') taskId: string) {
		return this.managerTasksServices.deleteTask(taskId);
	}
}
