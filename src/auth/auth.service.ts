import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserProfile } from '../user/entities/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UserService) {}

  async getOrCreateUser(userData: CreateUserDto): Promise<UserProfile> {
    return await this.userService.getOrCreateUser(userData);
  }

  async getUserById(id: number) {
    const user = await this.userService.getUserById(id);
    return user;
  }
}
