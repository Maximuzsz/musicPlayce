import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @ApiProperty({
    description: 'O nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @ApiProperty({
    description: 'A senha do usuário. Mínimo de 6 caracteres.',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}