/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './entities/base.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, BaseEntity]),
    ],
    providers: [UserService, UserDTO, UserEntity, JwtService],
    controllers: [UserController],
    exports: [UserService, UserEntity, UserDTO, JwtService, TypeOrmModule]
})
export class UserModule {}
