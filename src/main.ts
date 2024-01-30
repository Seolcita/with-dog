import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import mongoose from 'mongoose';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './auth/utils/UnauthorizedExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 3001;
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log('listening for requests');
    });
  });
}
bootstrap();
