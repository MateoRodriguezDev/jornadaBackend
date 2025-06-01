import { PartialType } from '@nestjs/mapped-types';
import { CreateJornadaDto } from './create-jornada.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateJornadaDto extends PartialType(CreateJornadaDto) {
        @IsOptional()
        @IsDate()
        deletedAt?: Date

}
