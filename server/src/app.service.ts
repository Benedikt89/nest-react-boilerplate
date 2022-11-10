import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMsg() {
    return { msg: 'Site is in develop process...' };
  }
}
