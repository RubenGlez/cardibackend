import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import GetUserByIdService from "../../../domain/services/user/GetUserByIdService"


type InputData = Pick<User, 'id' | 'password' | 'username'>

export default class UpdateUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run(
    inputData: InputData,
    tenantId: User['id']
  ): Promise<User> {
    if (inputData.id !== tenantId) throw new OutputError(OutputErrorTypes.NotOwned)

    const currentUser = await this._getUserByIdService.run(inputData.id)

    const dataToUpdate: User = {
      ...currentUser,
      password: inputData.password ?? currentUser.password,
      username: inputData.username ?? currentUser.username,
      updatedAt: new Date()
    }

    const userUpdated = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
