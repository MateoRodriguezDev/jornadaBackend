import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class ChangeStateDto {

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  long: number;

}
