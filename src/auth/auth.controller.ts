import { Request, Response } from 'express';
import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';
import { UserProfile } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    const user = request.user as UserProfile;
    const token = this.authService.createToken(user);
    response.redirect(
      `http://localhost:3000/auth/signin-success?token=${token}`,
    );
  }

  @Get('verifyToken')
  handleToken(@Req() request: Request, @Res() response: Response) {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      const user = this.authService.verifyToken(token);
      user && response.send({ id: user.id, email: user.email });
    } else {
      console.log('No token'); //TODO: add better handling
    }
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
