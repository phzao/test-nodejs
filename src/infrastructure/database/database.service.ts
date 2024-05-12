import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
  }
}
