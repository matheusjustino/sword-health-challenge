import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { AmqpModule } from './amqp/amqp.module';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule,
		AuthModule,
		TasksModule,
		AmqpModule,
	],
})
export class AppModule {}
