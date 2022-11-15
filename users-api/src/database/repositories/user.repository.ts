import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

// ENTITIES
import { User } from '../entities/user.entity';

export class UserRepository {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {}

	public get entity(): EntityRepository<User> {
		return this.userRepository;
	}
}
