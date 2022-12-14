import { Catch, RpcExceptionFilter, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter
	extends BaseRpcExceptionFilter
	implements RpcExceptionFilter<RpcException>
{
	private logger = new Logger(ExceptionFilter.name);

	public catch(exception: RpcException): Observable<any> {
		const loggerError = {
			message: exception.message,
			details: exception.getError(),
		};
		this.logger.error(loggerError);

		return throwError(exception.getError());
	}
}
