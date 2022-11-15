import { Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { AppConfigModule } from '../app-config/app-config.module';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { Role } from '../common/enums/role.enum';

// SERVICES
import { AuthService } from './auth.service';

// INTERFACES
import { AuthServiceInterface } from './interfaces/auth-service.interface';

jest.mock('bcrypt', () => ({
	compareSync: (data, hash) => data === hash,
}));

const mockUserRepository = {
	entity: {
		create: jest.fn().mockImplementation((options) => {
			return {
				id: randomUUID(),
				name: options.name,
				email: options.email,
				password: options.password,
				role: Role.TECH,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		}),
		findOne: jest.fn().mockImplementation((options) => {
			return Promise.resolve({
				id: options.id || randomUUID(),
				name: options.name || 'test name',
				email: options.email || 'test@test.com',
				password: options.password || 'pass test',
				role: options.role || Role.TECH,
				createdAt: options.createdAt || new Date(),
				updatedAt: options.updatedAt || new Date(),
			});
		}),
		persistAndFlush: jest.fn().mockImplementation((dto) => {
			return Promise.resolve({ ...dto });
		}),
	},
};

const TestingProvider: Provider[] = [
	{
		provide: AuthProviderEnum.AUTH_SERVICE,
		useClass: AuthService,
	},
	{
		provide: AuthProviderEnum.JWT_SERVICE,
		useClass: JwtService,
	},
	{
		provide: DatabaseProviderEnum.USER_REPOSITORY,
		useValue: mockUserRepository,
	},
];

describe('AuthService', () => {
	let service: AuthServiceInterface;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AppConfigModule,
				PassportModule,
				JwtModule.register({
					secret: process.env.SECRET,
					signOptions: {
						expiresIn: '12h',
					},
				}),
			],
			providers: TestingProvider,
		}).compile();

		service = module.get<AuthServiceInterface>(
			AuthProviderEnum.AUTH_SERVICE,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create user', async () => {
		const data = {
			name: 'Admin',
			email: 'admin_7@hotmail.com',
			password: '123',
		};

		const spy = jest.spyOn(service, 'register');
		await service.register(data);

		expect(spy).toBeCalledTimes(1);
	});

	it('should return auth token', async () => {
		const data = {
			email: 'test@test.com',
			password: 'pass test',
		};

		const spy = jest.spyOn(service, 'doLogin');
		const result = await service.doLogin(data);

		expect(spy).toBeCalledTimes(1);
		expect(result).not.toBeNull();
		expect(result).not.toBeUndefined();
		expect(typeof result).toBe('string');
	});
});
