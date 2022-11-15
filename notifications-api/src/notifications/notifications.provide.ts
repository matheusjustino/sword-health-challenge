import { Provider } from '@nestjs/common';

// ENUMS
import { NotificationsProvideEnum } from './enums/notifications-provide.enum';

// SERVICES
import { NotificationsService } from './notifications.service';

export const NotificationsProvider: Provider[] = [
	{
		provide: NotificationsProvideEnum.NOTIFICATIONS_SERVICE,
		useClass: NotificationsService,
	},
];
