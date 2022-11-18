import { User } from "../entities/User"

export interface UserRepository {
  getAll: () => Promise<User[]>
  getByEmail: (email: User['email']) => Promise<User | null>
  getById: (id: User['id']) => Promise<User | null>
  save: (inputData: User) => Promise<User>
  update: (inputData: User) => Promise<User>
  delete: (id: User['id']) => Promise<void>
}
