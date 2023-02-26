import { Auth } from '../../../domain/entities/Auth'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export interface CheckAuthenticationUseCaseDependecies {
  authRepository: AuthRepository
  userRepository: UserRepository
}

export interface CheckAuthenticationUseCaseProps {
  accessToken?: Auth['accessToken']
}
