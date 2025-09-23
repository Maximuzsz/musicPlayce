import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePlayDto {
  @ApiProperty({
    description: 'O ID do usuário que tocou a música (formato UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'O ID da música que foi tocada',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  songId: number;
}
