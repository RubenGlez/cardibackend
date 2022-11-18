import { User } from "../../entities/User"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { UserRepository } from "../../repositories/UserRepository"

export default class GetUserByIdService {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(id: User['id']): Promise<User> {
    const user = await this._userRepository.getById(id)
    if (user === null) throw new CardiError(CardiErrorTypes.UserNotFound)
    return user
  }
}
