import { User } from './domain'

declare namespace Express {
  export interface Request {
    userId?: User['id']
  }
}
