import { ApiStatus } from './api-status.interface';

export class ApiStatusEntity implements ApiStatus {
  constructor(public status: string, public timestamp: Date) {}
}
