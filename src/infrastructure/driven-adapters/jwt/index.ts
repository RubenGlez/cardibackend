import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../../config'
import { Auth } from '../../../domain/entities/Auth'
import { User } from '../../../domain/entities/User'

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
