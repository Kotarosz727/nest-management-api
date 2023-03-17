import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MaxLength(20)
  // todo: 型を厳密にする
  phoneNumber: string;
}
