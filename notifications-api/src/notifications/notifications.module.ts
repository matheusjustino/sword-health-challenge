import { Module } from '@nestjs/common';

import { NotificationsController } from './notifications.controller';

// PROVIDERS
import { NotificationsProvider } from './notifications.provide';

@Module({
	controllers: [NotificationsController],
	providers: NotificationsProvider,
})
export class NotificationsModule {}
