/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { BaseEntity } from './user/entities/base.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [

    // main modules
    AuthModule,
    UserModule,

    // .env resolution module
    // https://docs.nestjs.com/techniques/configuration#configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),

    // Jwt config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret: config.get<string>('SECRET_KEY_JWT'),
          secretOrPrivateKey: config.get<string>('PRIVATE_KEY_JWT')
      })
    }),

    // typeorm setup with config service & module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [BaseEntity, UserEntity],
        synchronize: true,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}