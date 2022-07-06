import {
  ForbiddenException,
  GetUserByIdService,
  User,
  UserRepository
} from '../../../domain'

export default class DeleteUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run (
    userId: User['id'],
    tenantId: User['id']
  ): Promise<void> {
    if (userId !== tenantId) throw new ForbiddenException()

    const userToDelete = await this._getUserByIdService.run(userId)
    await this._userRepository.delete(userToDelete.id)
  }
}
