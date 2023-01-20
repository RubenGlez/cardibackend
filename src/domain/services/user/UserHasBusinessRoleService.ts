import { UserRole } from '../../entities/User'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { UserRepository } from '../../repositories/UserRepository'
import {
  UserHasBusinessRoleServiceDependencies,
  UserHasBusinessRoleServiceProps
} from './types'

export default class UserHasBusinessRoleService {
  private readonly _userRepository: UserRepository

  constructor({ userRepository }: UserHasBusinessRoleServiceDependencies) {
    this._userRepository = userRepository
  }

  async run({ id }: UserHasBusinessRoleServiceProps): Promise<boolean> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new OutputError(OutputErrorTypes.UserNotFound)
    return user.role === UserRole.Business
  }
}
