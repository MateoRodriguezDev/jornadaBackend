import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateJornadaDto {
  @IsNotEmpty()
  @IsString()
  nameLocation: string;

  @IsNotEmpty()
  @IsDateString()
  startingDate: Date;

  @IsNotEmpty()
  @IsDateString()
  finishingDate: Date;

  @IsOptional()
  @IsDateString()
  dateStarted?: Date;

  @IsOptional()
  @IsDateString()
  dateFinished?: Date;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  long: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  firstImgUrl?: string;

  @IsOptional()
  @IsString()
  lastImgUrl?: string;
}
