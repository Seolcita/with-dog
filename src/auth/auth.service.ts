import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserProfile } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UserService) {}

  async getGoogleProfile(token: string) {
    try {
      return axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
    } catch (error) {
      console.error('Failed to get google profile:', error);
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );

      const expiresIn = response.data.expires_in;

      if (!expiresIn || expiresIn <= 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Failed to check if token is expired:', error);
      return true;
    }
  }

  async getOrCreateUser(userData: CreateUserDto): Promise<UserProfile> {
    return await this.userService.getOrCreateUser(userData);
  }

  async getUserById(id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }
}
