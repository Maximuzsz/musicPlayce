import { forwardRef, Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SongModule } from 'src/song/song.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, forwardRef(() => SongModule), UserModule],
  controllers: [PlaysController],
  providers: [PlaysService],
  exports: [PlaysService],
})
export class PlaysModule {}
