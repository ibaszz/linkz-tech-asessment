import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/db/PrismaService';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async like(userId, catId) {
    const cats = await this.prisma.cats.findUnique({ where: { id: catId } });
    if (!cats) {
      const resp = await fetch(`https://api.thecatapi.com/v1/images/${catId}`);
      const { id, url } = await resp.json();
      await this.prisma.cats.create({
        data: {
          id,
          url: url,
        },
      });
    }

    const loginHistory = await this.prisma.favorite.create({
      data: {
        userId,
        catId,
      },
    });

    return loginHistory;
  }

  async unlike(userId: string, catId: string): Promise<boolean> {
    await this.prisma.favorite.delete({
      where: { userId_catId: { catId, userId } },
    });

    return true;
  }
}
