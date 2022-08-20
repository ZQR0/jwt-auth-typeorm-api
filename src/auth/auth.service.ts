/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthDTO } from "./dto/auth.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from 'bcryptjs'


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private authRep: Repository<UserEntity>
    ) {}

    public async login(dto: AuthDTO) {
        
        const user = await this.validateUser(dto);

        return {
            user: await this.getUserFields(user, user.name),
            accessToken: await this.issueAccessToken(String(user.id)),
            message: 'success'
        };
    };

    public async createUser(dto: AuthDTO) {

        const oldUser = await this.userService.findByName(dto.name);
        if (oldUser) throw new UnauthorizedException({
            message: `User ${dto.name} already exists`
        });

        const newUser = new UserEntity();

        newUser.name = dto.name;
        newUser.password = await hash(dto.password, 5);

        const user = await this.authRep.save(newUser);

        return {
            user: await this.getUserFields(user, user.name),
            accessToken: await this.issueAccessToken(String(user.id)),
            options: {
                expiresIn: '31d',
            }
        };
    }

    private async issueAccessToken(name: string) {
        const payload: object = {name: name};

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                expiresIn: '31d',
                secret: process.env.SECRET_KEY_JWT
            }
        );

        return {accessToken};
    }

    private async validateUser(dto: AuthDTO): Promise<UserEntity> {
        const user = await this.userService.findByName(dto.name);
        if (!user) throw new NotFoundException({
            message: 'User not found'
        });

        const isValidPassword = await compare(dto.password, user.password);
        
        if (!user || !isValidPassword) {
            throw new UnauthorizedException({
                message: 'Invalid cridentials!'
            });
        }

        return user;
    };

    private async getUserFields(user: UserEntity, name: string): Promise<UserEntity> {
        const data = await this.userService.findByName(name)
        if (!data) throw new NotFoundException({
            message: 'No data'
        });

        return {
            id: data.id,
            name: user.name,
            password: user.password
        };
    };
};