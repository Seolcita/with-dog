import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class CheckTokenExpiryGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access_token'];
    console.log('ACCESSTOKEN🥎', accessToken);

    if (await this.authService.isTokenExpired(accessToken)) {
      const refreshToken = request.cookies['refresh_token'];
      console.log('refreshToken🚨', refreshToken);
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      try {
        const newAccessToken =
          await this.authService.getNewAccessToken(refreshToken);
        request.res.cookie('access_token', newAccessToken, {
          httpOnly: true,
        });
        request.cookies['access_token'] = newAccessToken;
      } catch (error) {
        throw new UnauthorizedException('Failed to refresh token');
      }
    }

    return true;
  }
}
