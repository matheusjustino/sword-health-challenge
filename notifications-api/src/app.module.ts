import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
	imports: [AppConfigModule, NotificationsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
