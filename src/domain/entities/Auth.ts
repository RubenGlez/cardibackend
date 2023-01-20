import { User, UserRole } from './User'

export interface Auth {
  userId: User['id']
  accessToken: string
  userRole: UserRole
}
