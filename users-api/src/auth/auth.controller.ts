import {
	Body,
	Controller,
	HttpStatus,
	Inject,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

// DTOS
import { DoLoginDTO } from './dtos/do-login.dto';
import { RegisterDTO } from './dtos/register.dto';

// ENUMS
import { AuthProviderEnum } from './enums/auth-provider.enum';

// INTERFACES
import { AuthServiceInterface } from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthProviderEnum.AUTH_SERVICE)
		private readonly authService: AuthServiceInterface,
	) {}

	@Post('register')
	public async register(@Body() body: RegisterDTO) {
		return this.authService.register(body);
	}

	@Post('login')
	public async doLogin(@Body() body: DoLoginDTO, @Res() res: Response) {
		const token = await this.authService.doLogin(body);
		return res.status(HttpStatus.OK).json({ token });
	}
}
