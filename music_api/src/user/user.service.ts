import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { PrismaService } from '../prisma/prisma.service';
import { auth } from 'firebase-admin';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    // Injeção do FirebaseService precisa ser corrigida para acessar o 'auth'
    private firebaseService: FirebaseService,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto; // Pega a senha do DTO

    const existingUser = await this.findByemail(email);
    if (existingUser) {
      throw new ConflictException(
        'Usuário com este e-mail já existe no banco de dados.',
      );
    }

    let firebaseUser: auth.UserRecord;
    try {
      firebaseUser = await auth().createUser({
        email,
        password: password,
        displayName: name,
      });
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException(
          'Este e-mail já está cadastrado no Firebase.',
        );
      }
      this.logger.error('Falha ao criar usuário no Firebase', error.stack);
      throw new InternalServerErrorException(
        'Não foi possível criar o usuário no Firebase.',
      );
    }

    try {
      // Salva no nosso banco SEM a senha
      const newUserInDb = await this.prisma.user.create({
        data: { email, name },
      });
      return newUserInDb;
    } catch (error) {
      this.logger.error(
        'Falha ao salvar usuário no banco de dados. Revertendo no Firebase...',
        error.stack,
      );
      // Rollback continua o mesmo
      await auth().deleteUser(firebaseUser.uid);
      throw new InternalServerErrorException(
        'Não foi possível salvar o usuário no banco de dados.',
      );
    }
  }

  async findByemail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
