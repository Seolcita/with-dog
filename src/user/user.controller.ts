import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProfile } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  async getUserById(@Query('userId') userId: string): Promise<UserProfile> {
    return await this.userService.getUserById(userId);
  }
}
