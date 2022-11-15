import { Module } from '@nestjs/common';

// PROVIDERS
import { TasksProvider } from './tasks.provider';

// CONTROLLERS
import { TasksController } from './tasks.controller';
import { ManagerTasksController } from './manager-tasks.controller';

@Module({
	controllers: [TasksController, ManagerTasksController],
	providers: TasksProvider,
})
export class TasksModule {}
