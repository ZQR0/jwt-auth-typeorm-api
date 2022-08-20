/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    name: string;

    @IsString()
    password: string;
}