import { Module } from '@nestjs/common';

import { RegisteredModules } from '../registered-modules/registered-modules';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { AuthController } from './auth.controller';
import { GoogleToken } from './utils/GoogleToken';

@Module({
  imports: [RegisteredModules],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'GOOGLE_TOKEN',
      useClass: GoogleToken,
    },
  ],
})
export class AuthModule {}
