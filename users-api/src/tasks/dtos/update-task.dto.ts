import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsIn,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class UpdateTaskDTO {
	@IsString()
	@MaxLength(2500)
	@IsOptional()
	public summary?: string;

	@IsBoolean()
	@IsOptional()
	@IsIn([true, false])
	@Transform(({ value }) => {
		if (['true', 'false'].includes(value)) {
			return JSON.parse(value);
		}
		return value;
	})
	public performTask?: boolean;
}
