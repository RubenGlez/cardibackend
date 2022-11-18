import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import UserModel from "../../driven-adapters/mongoose/models/UserModel"


export default class MongoUserRepository implements UserRepository {
  private readonly _model = UserModel

  private toDto(userToMap: any): User {
    const userDTO = Object.assign({ id: userToMap._id }, userToMap)
    delete userDTO._id
    delete userDTO.__v
    return userDTO
  }

  async getByEmail(email: User['email']): Promise<User | null> {
    const userFound = await this._model.findOne({ email }).lean()
    if (userFound === null) return null
    const userMapped = this.toDto(userFound)
    return userMapped
  }

  async getById(id: User['id']): Promise<User | null> {
    const userFound = await this._model.findById(id).lean()
    if (userFound === null) return null
    const userMapped = this.toDto(userFound)
    return userMapped
  }

  async save(inputData: User): Promise<User> {
    const userToCreate = new this._model(inputData)
    const userCreated = await userToCreate.save()
    const userMapped = this.toDto(userCreated.toObject())
    return userMapped
  }

  async update(inputData: User): Promise<User> {
    const userUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { new: true }
    ).lean()
    const userMapped = this.toDto(userUpdated)
    return userMapped
  }
}
