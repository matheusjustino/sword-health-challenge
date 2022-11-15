import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

// ENUMS
import { NotificationsProvideEnum } from './enums/notifications-provide.enum';

// INTERFACES
import { NotificationsServiceInterface } from './interfaces/notifications-service.interface';

// DTOS
import { NotificationsQueuePayloadDTO } from './dtos/notification-queue-payload.dto';

@Controller('notifications')
export class NotificationsController {
	constructor(
		@Inject(NotificationsProvideEnum.NOTIFICATIONS_SERVICE)
		private readonly notificationsService: NotificationsServiceInterface,
	) {}

	@EventPattern(process.env.NOTIFICATIONS_QUEUE)
	public publishNotification(@Payload() data: NotificationsQueuePayloadDTO) {
		this.notificationsService.publishNotification(data);
	}
}
