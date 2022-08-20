/* eslint-disable prettier/prettier */
import { UserEntity } from "../entities/user.entity";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";


// U can use this decorator to get current user in controller
export const CurrentUser = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return user ? data[user] : user
    }
)