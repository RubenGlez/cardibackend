import { User } from "../../entities/User"
import { UserRepository } from "../../repositories/UserRepository"

export default class GetUserByEmailService {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(email: User['email']): Promise<User | null> {
    const user = await this._userRepository.getByEmail(email)
    return user
  }
}
