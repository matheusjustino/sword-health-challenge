import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from './app-config-options';

@Module({
	imports: [ConfigModule.forRoot(configOptions)],
})
export class AppConfigModule {}
