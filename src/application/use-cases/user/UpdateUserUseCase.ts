import {
  User,
  UserRepository,
  GetUserByIdService,
  ForbiddenException
} from '../../../domain'

type InputData = Pick<User, 'id' | 'password' | 'username'>

export default class UpdateUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run (
    inputData: InputData,
    tenantId: User['id']
  ): Promise<User> {
    if (inputData.id !== tenantId) throw new ForbiddenException()

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
