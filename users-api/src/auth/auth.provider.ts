import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// ENUMS
import { AuthProviderEnum } from './enums/auth-provider.enum';

// SERVICES
import { AuthService } from './auth.service';

// STRATEGIES
import { JwtStrategy } from './strategy/jwt.strategy';

// GUARDS
import { JwtGuard } from './guards/jwt.guard';
import { RoleGuard } from './guards/role.guard';

export const AuthProvider: Provider[] = [
	{
		provide: AuthProviderEnum.AUTH_SERVICE,
		useClass: AuthService,
	},
	{
		provide: AuthProviderEnum.JWT_STRATEGY,
		useClass: JwtStrategy,
	},
	{
		provide: AuthProviderEnum.JWT_GUARD,
		useClass: JwtGuard,
	},
	{
		provide: AuthProviderEnum.ROLE_GUARD,
		useClass: RoleGuard,
	},
	{
		provide: AuthProviderEnum.JWT_SERVICE,
		useClass: JwtService,
	},
];
