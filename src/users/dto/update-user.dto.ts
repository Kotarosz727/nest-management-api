import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsNotEmpty, MaxLength, IsPhoneNumber, isNotEmpty } from "class-validator";

export class UpdateUserDto extends CreateUserDto {
}
