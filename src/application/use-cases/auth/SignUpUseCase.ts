import { Auth } from '../../../domain/entities/Auth'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import {
  PreferencesRepository,
  PreferencesRepositorySaveProps
} from '../../../domain/repositories/PreferencesRepository'
import {
  UserRepository,
  UserRepositorySaveProps
} from '../../../domain/repositories/UserRepository'
import ExistUserByEmailService from '../../../domain/services/user/ExistUserByEmailService'
import { SignUpUseCaseDependencies, SignUpUseCaseProps } from './types'

export default class SignUpUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository
  private readonly _preferencesRepository: PreferencesRepository
  private readonly _existUserByEmailService: ExistUserByEmailService

  constructor({
    authRepository,
    userRepository,
    preferencesRepository
  }: SignUpUseCaseDependencies) {
    this._authRepository = authRepository
    this._userRepository = userRepository
    this._preferencesRepository = preferencesRepository
    this._existUserByEmailService = new ExistUserByEmailService({
      userRepository
    })
  }

  async run({
    email,
    password,
    username,
    role
  }: SignUpUseCaseProps): Promise<Auth> {
    const existUser = await this._existUserByEmailService.run({ email })
    if (existUser) throw new OutputError(OutputErrorTypes.UserAlreadyExist)

    const encryptedPass = await this._authRepository.encryptPassword(password)

    const userToCreate: UserRepositorySaveProps = {
      email,
      password: encryptedPass,
      username: username ?? '',
      role
    }

    const userCreated = await this._userRepository.save(userToCreate)
    const accessToken = this._authRepository.generateToken(userCreated.id)

    const preferencesToCreate: PreferencesRepositorySaveProps = {
      owner: userCreated.id
    }
    await this._preferencesRepository.save(preferencesToCreate)

    return { userId: userCreated.id, accessToken, userRole: userCreated.role }
  }
}
