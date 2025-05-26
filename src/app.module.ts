import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/users/user.model';
import { envs } from './config';
import { JornadasModule } from './modules/jornadas/jornadas.module';
import { Jornada } from './modules/jornadas/jornada.model';

@Module({
  imports: [
     SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: envs.database_host,
        port: envs.database_port,
        username: envs.database_username,
        password: envs.database_pass,
        database: envs.database_name,
        models: [User, Jornada],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    JornadasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
