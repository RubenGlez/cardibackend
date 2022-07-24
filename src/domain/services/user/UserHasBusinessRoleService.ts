import { User, UserNotFoundException, UserRepository, UserRole } from '../..'

export default class UserHasBusinessRoleService {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (id: User['id']): Promise<boolean> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new UserNotFoundException()
    return user.role === UserRole.Business
  }
}
