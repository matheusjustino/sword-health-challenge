import { IsEmail, IsString } from 'class-validator';

export class RegisterDTO {
	@IsString()
	public name: string;

	@IsString()
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;
}
