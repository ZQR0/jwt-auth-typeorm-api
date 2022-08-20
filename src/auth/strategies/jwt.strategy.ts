/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/auth.jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY_JWT
        })
    }

    // The old parameters
    //{name}: Pick<UserEntity, 'name'>, {password}: Pick<UserEntity, 'password'>
    // U can paste it like
    // public async validateUser({name}: Pick<UserEntity, 'name'>, {password}: Pick<UserEntity, 'password'>): Promise<UserEntiry | string>
    // If u want to take

    public async validateUser(payload: JwtPayload): Promise<UserEntity | string> {
        const user = await this.userService.findByName(payload.name);
        if (user && user.password === payload.password) return user;

        return "Invalid cridentials"
    }
}