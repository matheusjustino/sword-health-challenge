import { Injectable } from '@nestjs/common';
import {
	ClientOptions,
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';

@Injectable()
export class AmqpService {
	private publishNotificationsClient: ClientProxy;

	private createClientConfig(params: {
		urls: string[];
		queue: string;
	}): ClientOptions {
		return {
			transport: Transport.RMQ,
			options: {
				...params,
			},
		};
	}

	public get notificationsClient(): ClientProxy {
		if (!this.publishNotificationsClient) {
			const rmClientConfig: ClientOptions = this.createClientConfig({
				queue: process.env.NOTIFICATIONS_QUEUE,
				urls: [
					`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
				],
			});
			this.publishNotificationsClient =
				ClientProxyFactory.create(rmClientConfig);
		}

		return this.publishNotificationsClient;
	}
}
