import { User, UserRole } from "../../entities/User"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { UserRepository } from "../../repositories/UserRepository"

export default class UserHasBusinessRoleService {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(id: User['id']): Promise<boolean> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new OutputError(OutputErrorTypes.UserNotFound)
    return user.role === UserRole.Business
  }
}
