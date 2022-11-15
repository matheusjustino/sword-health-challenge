import {
	Injectable,
	UnauthorizedException,
	Logger,
	Inject,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ENUMS
import { DatabaseProviderEnum } from '../../database/enums/database-provider.enum';

// REPOSITORIES
import { UserRepository } from '../../database/repositories/user.repository';

// INTERFACES
import { JwtStrategyInterface } from '../interfaces/jwt-strategy.interface';
import { TokenLoginDataInterface } from '../../common/interfaces/token-login-data.interface';

@Injectable()
export class JwtStrategy
	extends PassportStrategy(Strategy, 'jwt')
	implements JwtStrategyInterface
{
	private readonly logger: Logger = new Logger(JwtStrategy.name);

	constructor(
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepository,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET,
		});
	}

	public async validate(
		payload: TokenLoginDataInterface,
	): Promise<TokenLoginDataInterface> {
		try {
			await this.userRepository.entity.findOneOrFail({
				id: payload.id,
			});

			return payload;
		} catch (error) {
			this.logger.error(error);
			throw new UnauthorizedException('Token inválido');
		}
	}
}
