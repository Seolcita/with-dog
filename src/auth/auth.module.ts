import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { RegisteredModules } from '../registered-modules/registered-modules';
import { CheckTokenExpiryGuard } from './utils/CheckTokenExpiryGuard';

@Module({
  imports: [RegisteredModules],
  controllers: [AuthController],
  providers: [GoogleStrategy, CheckTokenExpiryGuard, SessionSerializer],
})
export class AuthModule {}
