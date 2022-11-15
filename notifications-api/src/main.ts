import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ExceptionFilter } from './app-config/filters/rpc-exception.filter';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [
					`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
				],
				queue: process.env.NOTIFICATIONS_QUEUE,
			},
		},
	);

	app.useGlobalFilters(new ExceptionFilter());

	await app
		.listen()
		.then(() => Logger.log(`APP Notifications is running!`, 'BOOTSTRAP'));
}
bootstrap();
