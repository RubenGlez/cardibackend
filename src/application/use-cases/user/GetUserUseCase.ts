import { GetUserByIdService, User, UserRepository } from '../../../domain'

export default class GetUserUseCase {
  private readonly _getUserByIdService: GetUserByIdService

  constructor (userRepository: UserRepository) {
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run (id: User['id']): Promise<User> {
    return await this._getUserByIdService.run(id)
  }
}
