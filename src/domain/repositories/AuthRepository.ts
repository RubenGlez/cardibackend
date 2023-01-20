import { Auth } from '../entities/Auth'
import { User } from '../entities/User'

export interface AuthRepository {
  encryptPassword: (password: User['password']) => Promise<string>
  comparePassword: (
    password1: User['password'],
    password2: User['password']
  ) => Promise<boolean>
  generateToken: (userId: User['id']) => Auth['accessToken']
  verifyToken: (accessToken: Auth['accessToken']) => User['id']
}
