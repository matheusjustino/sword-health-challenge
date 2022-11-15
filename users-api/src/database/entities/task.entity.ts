import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

// ENTITIES
import { User } from './user.entity';

@Entity({ tableName: 'tasks' })
export class Task {
	@PrimaryKey({ onCreate: () => randomUUID() })
	id: string;

	@Property({ type: String, length: 2500 })
	summary: string;

	@ManyToOne(() => User)
	owner: User;

	@Property({ default: null, nullable: true })
	performedDate: Date | null;

	@Property({ onCreate: () => new Date() })
	createdAt: Date;

	@Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
	updatedAt: Date;
}
