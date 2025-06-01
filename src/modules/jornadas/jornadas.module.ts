import { Module } from '@nestjs/common';
import { JornadasService } from './jornadas.service';
import { JornadasController } from './jornadas.controller';
import { UsersModule } from '../users/users.module';
import { Jornada } from './jornada.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FirebaseAdmin } from 'src/firebase-config/firebase.setup';

@Module({
  controllers: [JornadasController],
  imports: [SequelizeModule.forFeature([Jornada]),UsersModule],
  providers: [JornadasService, FirebaseAdmin],
})
export class JornadasModule {}
