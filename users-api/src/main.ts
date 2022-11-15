import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';
import { json } from 'express';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './app-config/filters/all-exception.filter';

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	app.use(helmet());
	app.use(compression());
	app.use(json({ limit: '50mb' }));
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalFilters(new AllExceptionFilter());

	app.enableShutdownHooks();

	await app.listen(PORT, async () =>
		Logger.log(`APP is running on => ${await app.getUrl()}`, 'BOOTSTRAP'),
	);
}
bootstrap();
