import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

// ENTITIES
import { Task } from '../entities/task.entity';

export class TaskRepository {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: EntityRepository<Task>,
	) {}

	public get entity(): EntityRepository<Task> {
		return this.taskRepository;
	}
}
