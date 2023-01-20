import { User } from '../../entities/User'
import { UserRepository } from '../../repositories/UserRepository'
import {
  GetUserByEmailServiceDependencies,
  GetUserByEmailServiceProps
} from './types'

export default class GetUserByEmailService {
  private readonly _userRepository: UserRepository

  constructor({ userRepository }: GetUserByEmailServiceDependencies) {
    this._userRepository = userRepository
  }

  async run({ email }: GetUserByEmailServiceProps): Promise<User | null> {
    const user = await this._userRepository.getByEmail(email)
    return user
  }
}
