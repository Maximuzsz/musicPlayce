// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly FIREBASE_API_KEY = 'SUA_CHAVE_DE_API_WEB_AQUI'; // <-- COLE SUA CHAVE AQUI

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`;

    try {
      await firstValueFrom(
        this.httpService.post(firebaseAuthUrl, {
          email,
          password,
          returnSecureToken: true,
        }),
      );
    } catch (error) {
      this.logger.warn(`Falha na tentativa de login para o e-mail: ${email}`);
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const user = await this.userService.findByemail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado em nosso sistema.',
      );
    }

    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}