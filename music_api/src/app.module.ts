import { Module } from '@nestjs/common';
import { PlaysModule } from './plays/plays.module';
import { PrismaModule } from './prisma/prisma.module';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SongModule, PrismaModule, PlaysModule, UserModule, AuthModule],
})
export class AppModule {}
