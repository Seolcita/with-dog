import { Response } from 'express';
import {
  Controller,
  Get,
  Inject,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';
import { CheckTokenExpiryGuard } from './utils/CheckTokenExpiryGuard';

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
  handleRedirect(@Req() request, @Res() response: Response) {
    const googleToken = request.user.accessToken;
    const googleRefreshToken = request.user.refreshToken;

    response.cookie('access_token', googleToken, { httpOnly: true });
    response.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });

    response.redirect('http://localhost:3000/auth/signin-success');
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getUserProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      const googleUserProfile =
        await this.authService.getGoogleProfile(accessToken);

      const dbUserProfile = await this.authService.getOrCreateUser({
        email: googleUserProfile.data.email,
        firstName: googleUserProfile.data.given_name,
        lastName: googleUserProfile.data.family_name,
        photoUrl: googleUserProfile.data.picture,
      });

      const user = {
        ...dbUserProfile,
        accessToken,
        refreshToken: req.cookies['refresh_token'],
      };

      return user;
    } else {
      throw new UnauthorizedException('No access token');
    }
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const isloggedout = await this.authService.revokeGoogleToken(refreshToken);
    isloggedout.status === 200 && res.json({ status: isloggedout.status });
  }
}
