import { Injectable } from '@nestjs/common';
import { ApiStatus } from '@domain/status/api-status.interface';

@Injectable()
export class StatusService {
  getStatus(): ApiStatus {
    return {
      status: 'API is running',
      timestamp: new Date(),
    };
  }
}
