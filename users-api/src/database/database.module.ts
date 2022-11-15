import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// PROVIDERS
import { DatabaseProviders } from './database.provider';

// ENTITIES
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';

@Global()
@Module({
	imports: [
		MikroOrmModule.forRoot(),
		MikroOrmModule.forFeature({
			entities: [User, Task],
		}),
	],
	providers: DatabaseProviders,
	exports: DatabaseProviders,
})
export class DatabaseModule {}
