import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserProfile } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userService: UserService,
    private jwtService: JwtService,
  ) {}

  createToken(user: UserProfile) {
    const payload = user;
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getOrCreateUser(userData: CreateUserDto): Promise<UserProfile> {
    return await this.userService.getOrCreateUser(userData);
  }

  async getUserById(id: number) {
    const user = await this.userService.getUserById(id);
    return user;
  }
}
