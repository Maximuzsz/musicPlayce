import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'O e-mail de login do usuário',
    example: 'user@email.com',
  })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  @IsNotEmpty({ message: 'O campo e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário (mínimo de 6 caracteres)',
    example: '123456',
    format: 'password',
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  password: string;
}
