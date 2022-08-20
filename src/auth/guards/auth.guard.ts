import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


// You can use this like decorator to check is user authenticated or not
export const JwtGuard = () => UseGuards(AuthGuard('jwt'))