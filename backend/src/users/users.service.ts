import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterPasswordRequestDto } from 'src/auth/request';
import { Logger } from 'src/commons/logger/Logger';
import { PrismaService } from 'src/config/db/PrismaService';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  async create({ email, image, name, password }: RegisterPasswordRequestDto) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, process.env.JWT_SECRET),
        image,
        name,
      },
    });

    return user;
  }

  async findOne(
    email: string,
    withEntities: boolean = false,
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        favorites: withEntities && {
          include: {
            cat: withEntities,
          },
        },
      },
    });

    return user;
  }

  async findOneOrCreate(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.upsert({
      create: {
        email,
        image: '',
        name: '',
      },
      update: {
        latestLogin: new Date(),
      },
      where: {
        email: email,
      },
    });

    return user;
  }
}
