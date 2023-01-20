import { Auth } from '../../../domain/entities/Auth'
import { User } from '../../../domain/entities/User'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import { PreferencesRepository } from '../../../domain/repositories/PreferencesRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'

export interface CheckBasicAuthenticationUseCaseDependecies {
  authRepository: AuthRepository
  userRepository: UserRepository
}

export interface CheckBasicAuthenticationUseCaseProps {
  accessToken?: Auth['accessToken']
}

export interface CheckBusinessAuthenticationUseCaseDependecies {
  authRepository: AuthRepository
  userRepository: UserRepository
}

export interface CheckBusinessAuthenticationUseCaseProps {
  accessToken?: Auth['accessToken']
}

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
