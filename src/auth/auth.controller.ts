import { Response } from 'express';
import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { GoogleToken } from './utils/GoogleToken';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    @Inject('GOOGLE_TOKEN') private readonly googleToken: GoogleToken,
  ) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res: Response) {
    const googleToken = req.user.accessToken;

    this.googleToken.setGoogleToken({
      accessToken: googleToken,
    });

    res.cookie('access_token', googleToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
      path: '/',
    });

    res.redirect(process.env.REDIRECT_SIGNIN_SUCCESS_URL);
  }

  @Get('token')
  async getToken(@Res() res: Response) {
    const token = this.googleToken.getGoogleToken();
    res.status(200).json({ token });
  }

  @Post('profile')
  async getUserProfile(@Req() req) {
    const accessToken = req.body.accessToken;

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
      };

      return user;
    } else {
      throw new UnauthorizedException('No access token');
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');

    res.json({ LoggedOut: true });
  }

  @Get('login-status')
  async loginStatus(@Req() req, @Res() res: Response) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({ loggedIn: false });
    }

    try {
      const isLogout = await this.authService.isTokenExpired(token);

      if (isLogout) {
        return res.json({ user: null, loggedIn: false });
      } else {
        const googleUserProfile =
          await this.authService.getGoogleProfile(token);

        const dbUserProfile = await this.authService.getUserByEmail(
          googleUserProfile.data.email,
        );

        const user = {
          ...dbUserProfile,
        };

        return res.json({ user, loggedIn: true });
      }
    } catch (error) {
      return res.json({ loggedIn: false });
    }
  }
}
