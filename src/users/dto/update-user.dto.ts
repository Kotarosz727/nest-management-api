import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsNotEmpty, MaxLength, IsPhoneNumber } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsPhoneNumber("JP")
  phone: string;
}
