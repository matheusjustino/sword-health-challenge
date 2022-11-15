// INTERFACES
import { TokenLoginDataInterface } from '../../common/interfaces/token-login-data.interface';

export interface JwtStrategyInterface {
	validate(
		payload: TokenLoginDataInterface,
	): Promise<TokenLoginDataInterface>;
}
