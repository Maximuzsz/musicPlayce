import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { PlaysModule } from '../plays/plays.module';

@Module({
  imports: [PrismaModule, forwardRef(() => PlaysModule)],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}
