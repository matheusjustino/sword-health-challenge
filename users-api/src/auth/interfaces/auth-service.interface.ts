// DTOS
import { RegisterDTO } from '../dtos/register.dto';
import { DoLoginDTO } from '../dtos/do-login.dto';

export interface AuthServiceInterface {
	register(data: RegisterDTO): Promise<void>;
	doLogin(data: DoLoginDTO): Promise<string>;
}
