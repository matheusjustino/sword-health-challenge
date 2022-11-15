import { Provider } from '@nestjs/common';

// ENUMS
import { TasksProviderEnum } from './enums/tasks-provider.enum';

// SERVICES
import { TasksService } from './tasks.service';
import { ManagerTasksService } from './manager-tasks.service';

export const TasksProvider: Provider[] = [
	{
		provide: TasksProviderEnum.TASKS_SERVICE,
		useClass: TasksService,
	},
	{
		provide: TasksProviderEnum.MANAGER_TASKS_SERVICE,
		useClass: ManagerTasksService,
	},
];
