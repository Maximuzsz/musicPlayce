import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePlayDto {
  @ApiProperty({
    description: 'O ID do usuário que tocou a música.',
    example: 12,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  userId: number;

  @ApiProperty({
    description: 'O ID da música que foi tocada.',
    example: 1,
  })
  @IsInt({ message: 'O ID da música deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID da música não pode estar vazio.' })
  songId: number;
}
