import { User, UserNotFoundException, UserRepository } from '../../../domain'

export default class GetUserByIdService {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (id: User['id']): Promise<User> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new UserNotFoundException()
    return user
  }
}
