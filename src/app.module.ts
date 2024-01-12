import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './db/entities/user.entity';
import { Referrer } from './db/entities/referrer.entity';
import { Referral } from './db/entities/referral.entity';
import * as process from "process";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `${process.cwd()}/src/config/environments/.env.${
        process.env.NODE_ENV
      }`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [User, Referrer, Referral],
          synchronize: process.env.NODE_ENV != "production",
        } as TypeOrmModuleAsyncOptions;
      },
      inject: [ConfigService],
    }),
    HttpModule,
    LibModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
