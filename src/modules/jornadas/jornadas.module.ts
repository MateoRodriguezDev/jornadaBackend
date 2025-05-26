import { Module } from '@nestjs/common';
import { JornadasService } from './jornadas.service';
import { JornadasController } from './jornadas.controller';
import { UsersModule } from '../users/users.module';
import { Jornada } from './jornada.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [JornadasController],
  imports: [SequelizeModule.forFeature([Jornada]),UsersModule],
  providers: [JornadasService],
})
export class JornadasModule {}
