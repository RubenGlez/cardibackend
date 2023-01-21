import { User } from '../entities/User'

export type UserRepositorySaveProps = Pick<
  User,
  'email' | 'password' | 'username' | 'role'
>

export interface UserRepository {
  getByEmail: (email: User['email']) => Promise<User | null>
  getById: (id: User['id']) => Promise<User | null>
  save: (props: UserRepositorySaveProps) => Promise<User>
  update: (inputData: User) => Promise<User>
}
