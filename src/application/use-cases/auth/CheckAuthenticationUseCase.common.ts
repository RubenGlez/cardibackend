import { User } from '../../../domain/entities/User'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import {
  CheckAuthenticationUseCaseDependecies,
  CheckAuthenticationUseCaseProps
} from './types.basic'

export default class CheckAuthenticationUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository

  constructor({
    authRepository,
    userRepository
  }: CheckAuthenticationUseCaseDependecies) {
    this._authRepository = authRepository
    this._userRepository = userRepository
  }

  async run({
    accessToken
  }: CheckAuthenticationUseCaseProps): Promise<User['id']> {
    if (accessToken === undefined) {
      throw new OutputError(OutputErrorTypes.MissingAccessToken)
    }

    let userIdFromAccessToken: string | undefined
    try {
      userIdFromAccessToken = this._authRepository.verifyToken(accessToken)
    } catch (error) {
      throw new OutputError(OutputErrorTypes.ExpiredAccessToken)
    }

    const user = await this._userRepository.getById(userIdFromAccessToken)
    if (user === null) {
      throw new OutputError(OutputErrorTypes.InvalidAccessToken)
    }

    return user.id
  }
}
