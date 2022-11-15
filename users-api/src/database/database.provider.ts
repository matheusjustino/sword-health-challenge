import { Provider } from '@nestjs/common';

// ENUMS
import { DatabaseProviderEnum } from './enums/database-provider.enum';

// REPOSITORIES
import { UserRepository } from './repositories/user.repository';
import { TaskRepository } from './repositories/task.repository';

export const DatabaseProviders: Provider[] = [
	{
		provide: DatabaseProviderEnum.USER_REPOSITORY,
		useClass: UserRepository,
	},
	{
		provide: DatabaseProviderEnum.TASK_REPOSITORY,
		useClass: TaskRepository,
	},
];
