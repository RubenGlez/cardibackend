import { User } from "../../../domain/entities/User"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import GetUserByIdService from "../../../domain/services/user/GetUserByIdService"

export default class DeleteUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run(
    userId: User['id'],
    tenantId: User['id']
  ): Promise<void> {
    if (userId !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)

    const userToDelete = await this._getUserByIdService.run(userId)
    await this._userRepository.delete(userToDelete.id)
  }
}
