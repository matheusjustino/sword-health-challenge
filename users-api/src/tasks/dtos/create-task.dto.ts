import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO {
	@IsString()
	@MaxLength(2500)
	public summary: string;
}
