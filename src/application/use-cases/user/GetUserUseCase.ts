import { User } from '../../../domain/entities/User'
import GetUserByIdService from '../../../domain/services/user/GetUserByIdService'
import { GetUserUseCaseDependencies, GetUserUseCaseProps } from './types'

export default class GetUserUseCase {
  private readonly _getUserByIdService: GetUserByIdService

  constructor({ userRepository }: GetUserUseCaseDependencies) {
    this._getUserByIdService = new GetUserByIdService({ userRepository })
  }

  async run({ userId }: GetUserUseCaseProps): Promise<User> {
    return await this._getUserByIdService.run({ userId })
  }
}
