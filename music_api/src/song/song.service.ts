import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSongDto } from './dto/create-song.dto';
import { PlaysService } from '../plays/plays.service';

@Injectable()
export class SongService {
  private readonly logger = new Logger(SongService.name);

  constructor(
    @Inject(forwardRef(() => PlaysService))
    private playsService: PlaysService,
    private prisma: PrismaService,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const { title, artist } = createSongDto;

    const existingSong = await this.prisma.song.findFirst({
      where: {
        title: title,
        artist: artist,
      },
    });

    if (existingSong) {
      throw new ConflictException(
        `A song with title "${title}" by artist "${artist}" already exists.`,
      );
    }

    try {
      return await this.prisma.song.create({
        data: createSongDto,
      });
    } catch (error) {
      this.logger.error(`Failed to create song: ${title}`, error.stack);
      throw new InternalServerErrorException('Could not create the song.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.song.findMany();
    } catch (error) {
      this.logger.error('Failed to retrieve all songs.', error.stack);
      throw new InternalServerErrorException('Could not retrieve songs.');
    }
  }

  async findOne(id: number) {
    let song;
    try {
      song = await this.prisma.song.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to retrieve song with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Could not retrieve the song.');
    }

    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    return song;
  }
}
