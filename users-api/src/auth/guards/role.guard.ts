import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// ENUMS
import { DatabaseProviderEnum } from '../../database/enums/database-provider.enum';

// REPOSITORIES
import { UserRepository } from '../../database/repositories/user.repository';

// ENTITIES
import { User } from '../../database/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepository,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>(
			'roles',
			context.getHandler(),
		);
		if (!roles) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();
		const userEntity = await this.userRepository.entity.findOne({
			id: user.id,
		});

		return user && this.hasRole(roles, userEntity);
	}

	private hasRole(roles: string[], user: User): boolean {
		return roles.indexOf(user.role) > -1;
	}
}
