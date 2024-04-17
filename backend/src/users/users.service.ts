import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterPasswordRequestDto } from 'src/auth/request';
import { Logger } from 'src/commons/logger/Logger';
import { PrismaService } from 'src/config/db/PrismaService';
import { hashSync } from 'bcrypt';

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
        password: hashSync(password, 10),
        image: image || '',
        name,
        latestLogin: new Date(),
      },
    });

    return user;
  }

  async findOne(
    email: string,
    withEntities: boolean = false,
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { email, deletedAt: null },
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
        deletedAt: null,
      },
    });

    return user;
  }

  async delete(email: string): Promise<void> {
    this.prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        email: email,
      },
    });
  }
}
