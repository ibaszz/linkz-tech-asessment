import { Injectable } from '@nestjs/common';
import { LoginHistory, User } from '@prisma/client';
import { PrismaService } from 'src/config/db/PrismaService';

@Injectable()
export class LoginHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(uuid) {
    const loginHistory = await this.prisma.loginHistory.create({
      data: {
        userId: uuid,
        dateTime: new Date(),
      },
    });

    return loginHistory;
  }

  async findMany(userId: string): Promise<LoginHistory[]> {
    const loginHistory = await this.prisma.loginHistory.findMany({
      where: { userId },
      orderBy: { dateTime: 'desc' },
    });

    return loginHistory;
  }
}
