import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Exception from 'src/commons/exceptions/exception';
import { UsersService } from 'src/users/users.service';
import { RegisterPasswordRequestDto, RegisterRequestDto } from './request';
import { compare, hash, hashSync } from 'bcrypt';
import { LoginHistoryService } from 'src/loginhistory/loginhistory.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private loginService: LoginHistoryService,
    private jwtService: JwtService,
  ) {}
  async register(registerReq: RegisterPasswordRequestDto) {
    const isExists = await this.usersService.findOne(registerReq.email);

    if (isExists) {
      throw Exception.userAlreadyRegistered(registerReq.email);
    }

    const user: User = await this.usersService.create(registerReq);

    return {
      ...user,
      accessToken: this.jwtService.sign({
        userId: user.uuid,
        username: user.email,
      }),
    };
  }

  async registerWithGoogle(registerReq: RegisterRequestDto) {
    const isExists = await this.usersService.findOne(registerReq.email);

    if (isExists) {
      throw Exception.userAlreadyRegistered(registerReq.email);
    }

    const user: User = await this.usersService.create({
      password: null,
      ...registerReq,
    });

    return {
      ...user,
      accessToken: this.jwtService.sign({
        userId: user.uuid,
        username: user.email,
      }),
    };
  }

  async login(username: string) {
    const user: User = await this.usersService.findOneOrCreate(username);

    await this.loginService.create(user.uuid);

    return {
      ...user,
      accessToken: this.jwtService.sign({
        userId: user.uuid,
        username: user.email,
      }),
    };
  }

  async loginWithPassword(username: string, password: string) {
    const user: User = await this.usersService.findOne(username);

    if (!user.password) {
      throw Exception.cannotSigninWithThisMethod();
    }

    if (!user) {
      throw Exception.unauthorized(username);
    }

    if (!(await compare(password, user.password))) {
      throw Exception.userPasswordWrong();
    }

    return {
      ...user,
      accessToken: this.jwtService.sign({
        userId: user.uuid,
        username: user.email,
      }),
    };
  }

  async deleteUser(email: string, password: string) {
    const user: User = await this.usersService.findOne(email);

    if (!user.password) {
      throw Exception.cannotSigninWithThisMethod();
    }

    if (!user) {
      throw Exception.unauthorized(email);
    }
    if (!(await compare(password, user.password))) {
      throw Exception.userPasswordWrong();
    }

    this.usersService.delete(email);
  }

  async getHistories(req: any) {
    return this.loginService.findMany(req.userId);
  }
}
