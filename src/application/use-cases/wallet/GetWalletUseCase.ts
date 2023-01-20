import { Wallet } from '../../../domain/entities/Wallet'
import GetWalletByOwnerService from '../../../domain/services/wallet/GetWalletByOwnerService'
import { GetWalletUseCaseDependencies, GetWalletUseCaseProps } from './types'

export default class GetWalletUseCase {
  private readonly _getWalletByIdService: GetWalletByOwnerService

  constructor({ walletRepository }: GetWalletUseCaseDependencies) {
    this._getWalletByIdService = new GetWalletByOwnerService({
      walletRepository
    })
  }

  async run({ tenantId }: GetWalletUseCaseProps): Promise<Wallet> {
    return await this._getWalletByIdService.run({ owner: tenantId })
  }
}
