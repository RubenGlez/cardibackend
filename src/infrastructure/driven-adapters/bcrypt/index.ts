import bcrypt from 'bcrypt'
import { BCRYPT_SALT } from '../../../config'

export class BCryptAdapter {
  private readonly _salt = BCRYPT_SALT

  async compare (text: string, verify: string): Promise<boolean> {
    const comparison = await bcrypt.compare(text, verify)
    return comparison
  }

  async hash (text: string): Promise<string> {
    const hashed = await bcrypt.hash(text, this._salt)
    return hashed
  }
}
