import { Controller, Get, Inject, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') readonly userService: UserService) {}

  @Get()
  getUser(@Req() request) {
    const { userId } = request.body;
    const user = this.userService.getUserById(userId);
    return user;
  }
}
