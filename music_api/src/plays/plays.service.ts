import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SongService } from 'src/song/song.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlaysService {
  private readonly logger = new Logger(PlaysService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SongService))
    private songsService: SongService,
  ) {}

  async create(createPlayDto: CreatePlayDto) {
    await this.songsService.findOne(createPlayDto.songId);

    try {
      return await this.prisma.play.create({
        data: createPlayDto,
      });
    } catch (error) {
      this.logger.error(
        `Failed to create play record for songId: ${createPlayDto.songId}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Could not create play record.',
      );
    }
  }

  async getTopSongs(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const topPlays = await this.prisma.play.groupBy({
        by: ['songId'],
        where: { playedAt: { gte: startDate } },
        _count: { songId: true },
        orderBy: { _count: { songId: 'desc' } },
        take: 10,
      });

      if (topPlays.length === 0) {
        return [];
      }
      
      const songIds = topPlays.map((play) => play.songId);
      const songs = await this.prisma.song.findMany({
        where: { id: { in: songIds } },
      });

      const songsMap = new Map(songs.map((song) => [song.id, song]));
      const topSongs = topPlays.map((play) => ({
        ...songsMap.get(play.songId),
        playCount: play._count.songId,
      }));
      
      topSongs.sort((a, b) => b.playCount - a.playCount);
      return topSongs;

    } catch (error) {
      this.logger.error('Failed to get top songs.', error.stack);
      throw new InternalServerErrorException('Could not retrieve top songs.');
    }
  }

  async getTopSongsRaw(days = 30) {
    try {
      const query = Prisma.sql`
          SELECT s.id AS song_id, s.title, s.artist, COUNT(p."songId") AS play_count
          FROM "Play" AS p
          JOIN "Song" AS s ON p."songId" = s.id
          WHERE p."playedAt" >= NOW() - INTERVAL '${Prisma.raw(`${days} days`)}'
          GROUP BY s.id
          ORDER BY play_count DESC
          LIMIT 10;
      `;
      
      const result = await this.prisma.$queryRaw<
        { song_id: number; title: string; artist: string; play_count: bigint }[]
      >(query);
      
      return result.map((song) => ({
        ...song,
        play_count: Number(song.play_count),
      }));

    } catch (error) {
      this.logger.error('Failed to get top songs with raw query.', error.stack);
      throw new InternalServerErrorException('Could not retrieve top songs.');
    }
  }
}
