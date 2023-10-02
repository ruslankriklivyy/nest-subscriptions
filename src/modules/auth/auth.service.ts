import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User is already exist with that email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(newUser);

    return {
      user: newUser,
      token,
    };
  }

  private async generateToken(user: UserEntity) {
    const jwtPayload = { id: user.id, email: user.email, role: user.role_id };
    return this.jwtService.sign(jwtPayload);
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) return user;

    throw new UnauthorizedException();
  }
}
