/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class AuthDTO {

    @IsString()
    name: string;

    @IsString()
    password: string;

}