import {
  User,
  UserRepository
} from '../../../domain'
import { UserModel } from '../..'

export default class MongoUserRepository implements UserRepository {
  private readonly _model = UserModel

  private map (userToMap: any): User {
    const user = userToMap.toObject({ versionKey: false })
    user.id = user._id
    delete user._id
    return user as User
  }

  async getAll (): Promise<User[]> {
    const allUsers = await this._model.find()
    if (allUsers.length === 0) return [] as User[]
    const allUsersMapped = allUsers.map((user) => this.map(user))
    return allUsersMapped
  }

  async getByEmail (email: User['email']): Promise<User | null> {
    const userFound = await this._model.findOne({ email })
    if (userFound === null) return null
    const userMapped = this.map(userFound)
    return userMapped
  }

  async getById (id: User['id']): Promise<User | null> {
    const userFound = await this._model.findById(id)
    if (userFound === null) return null
    const userMapped = this.map(userFound)
    return userMapped
  }

  async save (inputData: User): Promise<User> {
    const userToCreate = new this._model(inputData)
    const userCreated = await userToCreate.save()
    const userMapped = this.map(userCreated)
    return userMapped
  }

  async update (inputData: User): Promise<User> {
    const userUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { new: true }
    )
    const userMapped = this.map(userUpdated)
    return userMapped
  }

  async delete (id: User['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
