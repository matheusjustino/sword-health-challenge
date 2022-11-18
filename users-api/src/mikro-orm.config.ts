import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const logger: Logger = new Logger('DatabaseModule');

const config: Options = {
	driverOptions: {
		connection: { ssl: false },
		,
	},
	type: process.env.DB_TYPE as
		| 'mongo'
		| 'mysql'
		| 'mariadb'
		| 'postgresql'
		| 'sqlite'
		| 'better-sqlite',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	pool: {
		max: 8,
	},
	debug: process.env.NODE_ENV === 'develop',
	logger: logger.verbose.bind(logger),
	entities: ['dist/database/entities/*.entity.js'],
	entitiesTs: ['src/database/entities/*.entity.ts'],
	metadataProvider: TsMorphMetadataProvider,
	migrations: {
		tableName: 'mikro_orm_migrations',
		path: 'dist/database/migrations',
		pathTs: 'src/database/migrations',
		glob: '!(*.d).{js,ts}',
		transactional: true,
		disableForeignKeys: false,
		allOrNothing: true,
		dropTables: true,
		safe: false,
		snapshot: true,
		emit: 'ts',
	},
	seeder: {
		path: 'dist/database/seeders',
		pathTs: 'src/database/seeders',
		defaultSeeder: 'DatabaseSeeder',
		glob: '!(*.d).{js,ts}',
		emit: 'ts',
	},
};

console.log(process.env.NODE_ENV)
console.log(options);

export default config;
