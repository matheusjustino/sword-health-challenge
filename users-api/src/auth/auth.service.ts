import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';
import { AuthProviderEnum } from './enums/auth-provider.enum';

// REPOSITORIES
import { UserRepository } from '../database/repositories/user.repository';

// INTERFACES
import { AuthServiceInterface } from './interfaces/auth-service.interface';
import { JwtServiceInterface } from './interfaces/jwt-service.interface';

// DTOS
import { RegisterDTO } from './dtos/register.dto';
import { DoLoginDTO } from './dtos/do-login.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepository,
		@Inject(AuthProviderEnum.JWT_SERVICE)
		private readonly jwtService: JwtServiceInterface,
	) {}

	public async register(data: RegisterDTO): Promise<void> {
		this.logger.log('register');

		try {
			const user = this.userRepository.entity.create(data);
			await this.userRepository.entity.persistAndFlush(user);
		} catch (error) {
			if (error.message.includes('violates unique constraint')) {
				this.logger.error(error);
				throw new BadRequestException('Email already used');
			}
			throw error;
		}
	}

	public async doLogin(data: DoLoginDTO): Promise<string> {
		this.logger.log('doLogin');

		const user = await this.userRepository.entity.findOne({
			email: data.email,
		});

		if (!user) {
			this.logger.error('user not found');
			throw new BadRequestException('Invalid credentials');
		}

		if (!compareSync(data.password, user.password)) {
			throw new BadRequestException('Invalid credentials');
		}

		return this.jwtService.sign(
			{
				id: user.id,
				email: user.email,
			},
			{
				secret: process.env.SECRET,
				expiresIn: '12h',
			},
		);
	}
}
