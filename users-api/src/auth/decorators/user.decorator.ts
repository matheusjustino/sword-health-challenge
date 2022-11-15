import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// INTERFACES
import { UserRequestInterface } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): UserRequestInterface => {
		const request = context.switchToHttp().getRequest();
		return request.user as UserRequestInterface;
	},
);
