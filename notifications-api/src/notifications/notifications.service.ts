import { Injectable, Logger } from '@nestjs/common';

// INTERFACES
import { NotificationsServiceInterface } from './interfaces/notifications-service.interface';

// DTOS
import { NotificationsQueuePayloadDTO } from './dtos/notification-queue-payload.dto';

@Injectable()
export class NotificationsService implements NotificationsServiceInterface {
	private readonly logger: Logger = new Logger(NotificationsService.name);

	public publishNotification(data: NotificationsQueuePayloadDTO): void {
		this.logger.log(
			`The tech ${data.user.id} performed the task ${data.task.id} on date ${data.task.performedDate}`,
		);
	}
}
