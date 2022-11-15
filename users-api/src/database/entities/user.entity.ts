import {
	Collection,
	Entity,
	Enum,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { genSaltSync, hashSync } from 'bcrypt';

// ROLES
import { Role } from '../../common/enums/role.enum';

// ENTITIES
import { Task } from './task.entity';

@Entity({ tableName: 'users' })
export class User {
	@PrimaryKey({ onCreate: () => randomUUID() })
	id: string;

	@Property({ type: String })
	name: string;

	@Property({ type: String, unique: true })
	email: string;

	@Property({ type: String, hidden: true })
	password: string;

	@Enum({ default: Role.TECH })
	role: Role;

	@OneToMany(() => Task, (task) => task.owner)
	tasks = new Collection<Task>(this);

	@Property({ onCreate: () => new Date() })
	createdAt!: Date;

	@Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
	updatedAt!: Date;

	constructor(password: string) {
		const salt = genSaltSync(12);
		this.password = hashSync(password, salt);
	}
}
