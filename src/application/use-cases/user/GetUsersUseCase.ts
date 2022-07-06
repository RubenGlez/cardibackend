import { User, UserRepository } from '../../../domain'

export default class GetUsersUseCase {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (): Promise<User[]> {
    const users = await this._userRepository.getAll()
    return users
  }
}
