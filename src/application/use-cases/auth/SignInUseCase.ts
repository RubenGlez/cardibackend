import {
  Auth,
  AuthRepository,
  SignInInputData,
  UserRepository,
  GetUserByEmailService,
  CardiErrorTypes,
  CardiError
} from '../../../domain'

export default class SignInUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository
  private readonly _getUserByEmailService: GetUserByEmailService

  constructor (authRepository: AuthRepository, userRepository: UserRepository) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._getUserByEmailService = new GetUserByEmailService(userRepository)
  }

  async run (inputData: SignInInputData): Promise<Auth> {
    const foundUser = await this._getUserByEmailService.run(inputData.email)
    if (foundUser === null) throw new CardiError(CardiErrorTypes.UserNotFound)

    const isPasswordCorrect = await this._authRepository.comparePassword(
      inputData.password,
      foundUser.password
    )

    if (!isPasswordCorrect) throw new CardiError(CardiErrorTypes.InvalidCredentials)

    const userUpdated = await this._userRepository.update(foundUser)

    const accessToken = await this._authRepository.generateToken(userUpdated.id)
    return { userId: userUpdated.id, accessToken }
  }
}
