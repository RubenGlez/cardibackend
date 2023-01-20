import jwt from 'jsonwebtoken'
import { Auth } from '../../../domain/entities/Auth'
import { User } from '../../../domain/entities/User'

export const JWT_KEY = 'unaclavecualquiera'

export class JwtAdapter {
  generateToken(userId: User['id']): string {
    const token = jwt.sign({ userId }, JWT_KEY, { expiresIn: '12h' })
    return token
  }

  verifyToken(accessToken: Auth['accessToken']): User['id'] {
    const userSession: any = jwt.verify(accessToken, JWT_KEY)
    return userSession?.userId ?? ''
  }
}
