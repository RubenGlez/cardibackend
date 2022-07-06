import { BCryptAdapter, JwtAdapter } from '../../../infrastructure'
import {
  Auth,
  AuthRepository,
  User
} from '../../../domain'

export default class MongoAuthRepository implements AuthRepository {
  private readonly _bcryptAdapter: BCryptAdapter
  private readonly _jwtAdapter: JwtAdapter

  constructor () {
    this._bcryptAdapter = new BCryptAdapter()
    this._jwtAdapter = new JwtAdapter()
  }

  async encryptPassword (password: User['password']): Promise<string> {
    const encryptedPass = await this._bcryptAdapter.hash(password)
    return encryptedPass
  }

  async comparePassword (
    password1: User['password'],
    password2: User['password']
  ): Promise<boolean> {
    const areSamePasswords = await this._bcryptAdapter.compare(password1, password2)
    return areSamePasswords
  }

  generateToken (userId: User['id']): Auth['accessToken'] {
    const accessToken = this._jwtAdapter.generateToken(userId)
    return accessToken
  }

  verifyToken (accessToken: Auth['accessToken']): User['id'] {
    const userId = this._jwtAdapter.verifyToken(accessToken)
    return userId
  }
}
