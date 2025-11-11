import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ChangeStateDto {
  @IsNotEmpty()
  @Type(() => IsString)
  @IsString()
  lat: string;

  @IsNotEmpty()
  @Type(() => IsString)
  @IsString()
  long: string;
}
