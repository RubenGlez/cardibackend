import { Auth } from "../../../domain/entities/Auth"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { AuthRepository, SignInInputData } from "../../../domain/repositories/AuthRepository"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import GetUserByEmailService from "../../../domain/services/user/GetUserByEmailService"

export default class SignInUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository
  private readonly _getUserByEmailService: GetUserByEmailService

  constructor(authRepository: AuthRepository, userRepository: UserRepository) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._getUserByEmailService = new GetUserByEmailService(userRepository)
  }

  async run(inputData: SignInInputData): Promise<Auth> {
    const foundUser = await this._getUserByEmailService.run(inputData.email)
    if (foundUser === null) throw new CardiError(CardiErrorTypes.UserNotFound)

    const isPasswordCorrect = await this._authRepository.comparePassword(
      inputData.password,
      foundUser.password
    )

    if (!isPasswordCorrect) throw new CardiError(CardiErrorTypes.InvalidCredentials)

    const userUpdated = await this._userRepository.update(foundUser)

    const accessToken = await this._authRepository.generateToken(userUpdated.id)
    return { userId: userUpdated.id, accessToken, userRole: userUpdated.role }
  }
}
