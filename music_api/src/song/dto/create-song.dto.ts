import { ApiProperty } from '@nestjs/swagger'; // Importe aqui
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    description: 'O título da música',
    example: 'Stairway to Heaven',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'O artista da música',
    example: 'Led Zeppelin',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  artist: string;

  @ApiProperty({
    description: 'O álbum da música (opcional)',
    example: 'Led Zeppelin IV',
    required: false, // Marque como não obrigatório
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  album?: string;

  @ApiProperty({
    description: 'O ano de lançamento da música (opcional)',
    example: 1971,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Min(1900)
  year?: number;
}
