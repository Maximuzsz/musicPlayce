import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('songs')
export class SongController {
  private readonly logger = new Logger(SongController.name);

  constructor(private readonly songService: SongService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma nova música' })
  @ApiResponse({ status: 201, description: 'A música foi criada com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Os dados fornecidos são inválidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'A música já existe (mesmo título e artista).',
  })
  create(@Body() createSongDto: CreateSongDto) {
    this.logger.log(`Creating a new song: ${JSON.stringify(createSongDto)}`);
    return this.songService.create(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as músicas cadastradas' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de músicas.' })
  findAll() {
    this.logger.log('Fetching all songs');
    return this.songService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma música pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Retorna os dados da música.' })
  @ApiResponse({
    status: 404,
    description: 'A música com o ID fornecido não foi encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Fetching song with id: ${id}`);
    return this.songService.findOne(id);
  }
}
