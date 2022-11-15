import { Migration } from '@mikro-orm/migrations';

export class Migration20221114185235 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "users" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'MANAGER\', \'TECHNICIAN\')) not null default \'TECHNICIAN\', "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "users_pkey" primary key ("id"));',
		);
		this.addSql(
			'alter table "users" add constraint "users_email_unique" unique ("email");',
		);
	}
}
