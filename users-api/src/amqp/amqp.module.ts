import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AmqpService } from './amqp.service';
import { AmqpProviderEnum } from './enums/amqp-provider.enum';

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: AmqpProviderEnum.SEND_NOTIFICATIONS,
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
					],
					queue: process.env.NOTIFICATIONS_QUEUE,
				},
			},
		]),
	],
	providers: [AmqpService],
	exports: [AmqpService],
})
export class AmqpModule {}
