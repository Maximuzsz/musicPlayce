import { Body, Controller, Post, Logger, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlayDto } from './dto/create-play.dto';
import { PlaysService } from './plays.service';

@ApiTags('plays')
@Controller('plays')
export class PlaysController {
  private readonly logger = new Logger(PlaysController.name);

  constructor(private readonly playsService: PlaysService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar que uma música foi tocada' })
  @ApiResponse({
    status: 201,
    description: 'Registro de execução criado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'A música com o ID fornecido não foi encontrada.',
  })
  create(@Body() createPlayDto: CreatePlayDto) {
    this.logger.log(`Registrando play para songId: ${createPlayDto.songId}`);
    return this.playsService.create(createPlayDto);
  }

  @Get('top') // Rota: GET /songs/top
  @ApiOperation({
    summary: 'Listar as 10 músicas mais tocadas nos últimos 30 dias',
  })
  @ApiResponse({ status: 200, description: 'Retorna o ranking de músicas.' })
  getTopSongs() {
    this.logger.log('Buscando o top 10 músicas');
    return this.playsService.getTopSongs();
  }

  @Get('top-raw')
  @ApiOperation({
    summary: 'Listar top 10 músicas (com SQL puro)',
    description:
      'Exemplo utilizando uma query raw para buscar as músicas mais tocadas.',
  })
  @ApiResponse({ status: 200, description: 'Retorna o ranking de músicas.' })
  getTopSongsRaw() {
    this.logger.log('Buscando o top 10 músicas via query raw');
    return this.playsService.getTopSongsRaw();
  }
}
