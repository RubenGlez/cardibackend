import { Auth } from "../../../domain/entities/Auth"
import { User, UserRole } from "../../../domain/entities/User"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { AuthRepository } from "../../../domain/repositories/AuthRepository"
import { UserRepository } from "../../../domain/repositories/UserRepository"

export default class CheckBusinessAuthenticationUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository

  constructor(authRepository: AuthRepository, userRepository: UserRepository) {
    this._authRepository = authRepository
    this._userRepository = userRepository
  }

  async run(accessToken?: Auth['accessToken']): Promise<User['id']> {
    if (accessToken === undefined) throw new CardiError(CardiErrorTypes.MissingAccessToken)

    let userIdFromAccessToken;
    try {
      userIdFromAccessToken = this._authRepository.verifyToken(accessToken)
    } catch (error) {
      throw new CardiError(CardiErrorTypes.ExpiredAccessToken)
    }

    const user = await this._userRepository.getById(userIdFromAccessToken)
    if (user === null) throw new CardiError(CardiErrorTypes.InvalidAccessToken)

    if (user.role !== UserRole.Business) throw new CardiError(CardiErrorTypes.InvalidUserRole)

    return user.id
  }
}
