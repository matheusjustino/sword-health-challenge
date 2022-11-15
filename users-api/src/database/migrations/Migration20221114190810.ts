import { Migration } from '@mikro-orm/migrations';

export class Migration20221114190810 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "tasks" ("id" varchar(255) not null, "summary" varchar(2500) not null, "owner_id" varchar(255) not null, "performed_date" timestamptz(0) null default null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "tasks_pkey" primary key ("id"));',
		);

		this.addSql(
			'alter table "tasks" add constraint "tasks_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;',
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists "tasks" cascade;');
	}
}
