import { User } from './User'

export interface Auth {
  userId: User['id']
  accessToken: string
}
