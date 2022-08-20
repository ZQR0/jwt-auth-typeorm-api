/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,

        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('SECRET_KEY_JWT'),
                signOptions: {expiresIn: '31d'},
                secretOrPrivateKey: config.get<string>('PRIVATE_KEY_JWT')
            })
        }),

        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [JwtStrategy, AuthDTO, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
