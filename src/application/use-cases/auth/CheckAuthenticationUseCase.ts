import {
  Auth,
  AuthRepository,
  UserRepository,
  User,
  MissingAccessTokenException,
  InvalidAccessTokenException
} from '../../../domain'

export default class CheckAuthenticationUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository

  constructor (authRepository: AuthRepository, userRepository: UserRepository) {
    this._authRepository = authRepository
    this._userRepository = userRepository
  }

  async run (accessToken?: Auth['accessToken']): Promise<User['id']> {
    if (accessToken === undefined) throw new MissingAccessTokenException()

    const userIdFromAccessToken = this._authRepository.verifyToken(accessToken)
    const user = await this._userRepository.getById(userIdFromAccessToken)
    if (user === null) throw new InvalidAccessTokenException()

    return user.id
  }
}
