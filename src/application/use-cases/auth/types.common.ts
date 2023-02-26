import { User } from '../../../domain/entities/User'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import { PreferencesRepository } from '../../../domain/repositories/PreferencesRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export interface SignInUseCaseDependencies {
  authRepository: AuthRepository
  userRepository: UserRepository
}

export type SignInUseCaseProps = Pick<User, 'email' | 'password'>

export interface SignUpUseCaseDependencies {
  authRepository: AuthRepository
  userRepository: UserRepository
  preferencesRepository: PreferencesRepository
}

export type SignUpUseCaseProps = Pick<
  User,
  'email' | 'password' | 'username' | 'role'
>
