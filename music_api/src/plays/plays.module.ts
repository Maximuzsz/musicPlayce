import { forwardRef, Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SongModule } from 'src/song/song.module';

@Module({
  imports: [PrismaModule, forwardRef(() => SongModule)],
  controllers: [PlaysController],
  providers: [PlaysService],
  exports: [PlaysService],
})
export class PlaysModule {}
