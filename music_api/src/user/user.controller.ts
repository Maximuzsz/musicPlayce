import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra o usuário' })
  @ApiResponse({
    status: 201,
    description: 'Registro de execução criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário com este e-mail já existe.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.userService.create(createUserDto);
  }
}
