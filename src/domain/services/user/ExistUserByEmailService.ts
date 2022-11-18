import { User } from "../../entities/User"
import { UserRepository } from "../../repositories/UserRepository"

export default class ExistUserByEmailService {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(email: User['email']): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email)
    if (user !== null) return true
    return false
  }
}
