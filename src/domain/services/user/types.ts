import { User } from '../../entities/User'
import { UserRepository } from '../../repositories/UserRepository'

export interface ExistUserByEmailServiceDependencies {
  userRepository: UserRepository
}

export interface ExistUserByEmailServiceProps {
  email: User['email']
}

export interface GetUserByEmailServiceDependencies {
  userRepository: UserRepository
}

export interface GetUserByEmailServiceProps {
  email: User['email']
}

export interface GetUserByIdServiceDependencies {
  userRepository: UserRepository
}

export interface GetUserByIdServiceProps {
  userId: User['id']
}

export interface UserHasBusinessRoleServiceDependencies {
  userRepository: UserRepository
}

export interface UserHasBusinessRoleServiceProps {
  id: User['id']
}
