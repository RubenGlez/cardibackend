import { UserRepository } from '../../repositories/UserRepository'
import {
  ExistUserByEmailServiceDependencies,
  ExistUserByEmailServiceProps
} from './types'

export default class ExistUserByEmailService {
  private readonly _userRepository: UserRepository

  constructor({ userRepository }: ExistUserByEmailServiceDependencies) {
    this._userRepository = userRepository
  }

  async run({ email }: ExistUserByEmailServiceProps): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email)
    if (user !== null) return true
    return false
  }
}
