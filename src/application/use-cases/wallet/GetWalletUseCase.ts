import { GetWalletByOwnerService } from 'domain/services/wallet'
import { User, Wallet, WalletRepository } from '../../../domain'

export default class GetWalletUseCase {
  private readonly _getWalletByIdService: GetWalletByOwnerService

  constructor (walletRepository: WalletRepository) {
    this._getWalletByIdService = new GetWalletByOwnerService(walletRepository)
  }

  async run (userId: User['id']): Promise<Wallet> {
    return await this._getWalletByIdService.run(userId)
  }
}
