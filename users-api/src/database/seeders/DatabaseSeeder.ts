import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

// ENUMS
import { Role } from '../../common/enums/role.enum';
import { Task } from '../entities/task.entity';

// ENTITIES
import { User } from '../entities/user.entity';

const users = [
	{
		name: 'Admin',
		email: 'admin@test.com',
		password: '123',
		role: Role.MANAGER,
	},
	{
		name: 'Test',
		email: 'test@test.com',
		password: '123',
	},
];

const tasks = [
	{
		summary: 'Summary 1',
	},
	{
		summary: 'Summary 2',
	},
];

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		for (const user of users) {
			const newUser = await em.create(User, user);
			await em.persistAndFlush(newUser);
		}

		const techUser = await em.findOne(User, {
			role: Role.TECH,
		});

		for (const task of tasks) {
			const newTask = await em.create(Task, {
				summary: task.summary,
				owner: techUser,
			});
			await em.persistAndFlush(newTask);
		}
	}
}
