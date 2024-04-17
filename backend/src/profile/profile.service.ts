import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  async getProfile(req: any): Promise<User> {
    const user = await this.userService.findOne(req.username, true);
    return user;
  }
}
