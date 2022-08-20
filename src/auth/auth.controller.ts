/* eslint-disable prettier/prettier */
import { Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication & Registration')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    public async loginUser(@Body() dto: AuthDTO) {
        return await this.authService.login(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('registration')
    public async register(@Body() dto: AuthDTO) {
        return await this.authService.createUser(dto);
    }
}