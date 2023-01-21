import bcrypt from 'bcrypt'
import { BCRYPT_SALT } from '../../../config'

export class BCryptAdapter {
  private readonly _salt = BCRYPT_SALT

  async compare (password: string, passwordHash: string): Promise<boolean> {
    const comparison = await bcrypt.compare(password, passwordHash)
    return comparison
  }

  async hash (password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this._salt)
    return hashed
  }
}
