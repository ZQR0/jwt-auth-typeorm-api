/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UsePipes, ValidationPipe, HttpCode } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User`s methods')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {};


    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Get('by-name/:name')
    public async userByName(@Param(':name') name: string) {
        return this.userService.findByName(name);
    };

    @Get('users')
    public async getAllUsers() {
        return await this.userService.getAllUsers()
    };
}