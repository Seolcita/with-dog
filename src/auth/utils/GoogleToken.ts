import { Injectable } from '@nestjs/common';

interface Token {
  accessToken: string;
}

@Injectable()
export class GoogleToken {
  private accessToken: string;

  setGoogleToken({ accessToken }: Token) {
    this.accessToken = accessToken;
  }

  getGoogleToken() {
    return { accessToken: this.accessToken };
  }
}
