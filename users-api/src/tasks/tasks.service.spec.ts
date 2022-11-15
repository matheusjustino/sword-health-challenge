import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { AppConfigModule } from '../app-config/app-config.module';
import { DatabaseModule } from '../database/database.module';

// ENUMS
import { Role } from '../common/enums/role.enum';
import { TasksProviderEnum } from './enums/tasks-provider.enum';
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// INTERFACES
import { TasksServiceInterface } from './interfaces/tasks-service.interface';

// SERVICES
import { TasksService } from './tasks.service';
import { AmqpService } from '../amqp/amqp.service';

const mockUserRepository = {
	entity: {
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
	},
};

const mockTaskRepository = {
	entity: {
		create: jest.fn().mockImplementation((options) => {
			return Promise.resolve({
				id: randomUUID(),
				summary: options.summary || 'task summary',
				ownerId: options.owner.id || 'owner_id',
				performedDate: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}),
		find: jest.fn().mockImplementation((options) => {
			return Promise.resolve([
				{
					id: randomUUID(),
					summary: 'task summary',
					ownerId: options.owner.id || 'owner_id',
					performedDate: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}),
		findOne: jest.fn().mockImplementation((options) => {
			return Promise.resolve({
				id: options.id || randomUUID(),
				summary: 'task summary',
				ownerId: options.owner.id || 'owner_id',
				performedDate: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}),
		persistAndFlush: jest.fn().mockImplementation(() => {
			return Promise.resolve({
				id: randomUUID(),
				summary: 'task summary',
				ownerId: 'owner_id',
				performedDate: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}),
	},
};

const TestingProvider: Provider[] = [
	{
		provide: TasksProviderEnum.TASKS_SERVICE,
		useClass: TasksService,
	},
	{
		provide: DatabaseProviderEnum.USER_REPOSITORY,
		useValue: mockUserRepository,
	},
	{
		provide: DatabaseProviderEnum.TASK_REPOSITORY,
		useValue: mockTaskRepository,
	},
	{
		provide: AmqpService,
		useValue: {
			emit: jest.fn(),
		},
	},
];

describe('TasksService', () => {
	let service: TasksServiceInterface;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppConfigModule, DatabaseModule],
			providers: TestingProvider,
		}).compile();

		service = module.get<TasksServiceInterface>(
			TasksProviderEnum.TASKS_SERVICE,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a new task', async () => {
		const data = {
			summary: 'summary task',
		};

		const spy = jest.spyOn(service, 'createTask');
		await service.createTask('user_id', data);

		expect(spy).toBeCalledTimes(1);
	});

	it('should return user tasks', async () => {
		const spy = jest.spyOn(service, 'findTasks');
		const result = await service.findTasks('user_id');

		expect(spy).toBeCalledTimes(1);
		expect(result.length).toBeGreaterThan(0);
		result.forEach((task) => {
			expect(task.performedDate).toBeNull();
			expect(task).toMatchObject({
				id: expect.any(String),
				summary: expect.any(String),
				ownerId: expect.any(String),
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			});
		});
	});
});
