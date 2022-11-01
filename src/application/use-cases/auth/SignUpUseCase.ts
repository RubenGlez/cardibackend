import {
  CardiError,
  CardiErrorTypes,
  Auth,
  AuthRepository,
  ExistUserByEmailService,
  Preferences,
  PreferencesRepository,
  SignUpInputData,
  User,
  UserRepository
} from '../../../domain'

export default class SignUpUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository
  private readonly _preferencesRepository: PreferencesRepository
  private readonly _existUserByEmailService: ExistUserByEmailService

  constructor (authRepository: AuthRepository, userRepository: UserRepository, preferencesRepository: PreferencesRepository) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._preferencesRepository = preferencesRepository
    this._existUserByEmailService = new ExistUserByEmailService(userRepository)
  }

  async run (inputData: SignUpInputData): Promise<Auth> {
    const existUser = await this._existUserByEmailService.run(inputData.email)
    if (existUser) throw new CardiError(CardiErrorTypes.UserAlreadyExist)

    const encryptedPass = await this._authRepository.encryptPassword(inputData.password)

    const userToCreate: User = {
      email: inputData.email,
      password: encryptedPass,
      username: inputData.username ?? '',
      role: inputData.role
    }

    const userCreated = await this._userRepository.save(userToCreate)
    const accessToken = await this._authRepository.generateToken(userCreated.id)

    const preferencesToCreate: Preferences= {
      user: userCreated.id
    }
    await this._preferencesRepository.save(preferencesToCreate)

    return { userId: userCreated.id, accessToken, userRole: userCreated.role }
  }
}
