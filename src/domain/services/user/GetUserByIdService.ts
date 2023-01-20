import { User } from '../../entities/User'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { UserRepository } from '../../repositories/UserRepository'
import {
  GetUserByIdServiceDependencies,
  GetUserByIdServiceProps
} from './types'

export default class GetUserByIdService {
  private readonly _userRepository: UserRepository

  constructor({ userRepository }: GetUserByIdServiceDependencies) {
    this._userRepository = userRepository
  }

  async run({ id }: GetUserByIdServiceProps): Promise<User> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new OutputError(OutputErrorTypes.UserNotFound)
    return user
  }
}
