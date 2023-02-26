import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'

type UserToUpdate = Pick<User, 'id' | 'password' | 'username'>

export interface GetUserUseCaseDependencies {
  userRepository: UserRepository
}

export interface GetUserUseCaseProps {
  userId: User['id']
}

export interface UpdateUserUseCaseDependencies {
  userRepository: UserRepository
}

export interface UpdateUserUseCaseProps extends UserToUpdate {
  tenantId: User['id']
  userId: User['id']
}
