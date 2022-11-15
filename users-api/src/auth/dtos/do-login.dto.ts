import { IsEmail, IsString } from 'class-validator';

export class DoLoginDTO {
	@IsString()
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;
}
