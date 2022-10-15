import { uuid } from 'uuidv4';

export class UuidAdapter {
  generateUuid (): string {
    return uuid()
  }
}
