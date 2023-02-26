import { User } from '../../../domain/entities/User'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import GetUserByIdService from '../../../domain/services/user/GetUserByIdService'
import { UpdateUserUseCaseDependencies, UpdateUserUseCaseProps } from './types.common'

export default class UpdateUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor({ userRepository }: UpdateUserUseCaseDependencies) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService({ userRepository })
  }

  async run({
    tenantId,
    userId,
    password,
    username
  }: UpdateUserUseCaseProps): Promise<User> {
    if (userId !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const currentUser = await this._getUserByIdService.run({ userId })

    const dataToUpdate: User = {
      ...currentUser,
      password: password ?? currentUser.password,
      username: username ?? currentUser.username,
      updatedAt: new Date()
    }

    const userUpdated = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
