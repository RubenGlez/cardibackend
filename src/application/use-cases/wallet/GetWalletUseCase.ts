import { User } from "../../../domain/entities/User"
import { Wallet } from "../../../domain/entities/Wallet"
import { WalletRepository } from "../../../domain/repositories/WalletRepository"
import { GetWalletByOwnerService } from "../../../domain/services/wallet"

export default class GetWalletUseCase {
  private readonly _getWalletByIdService: GetWalletByOwnerService

  constructor(walletRepository: WalletRepository) {
    this._getWalletByIdService = new GetWalletByOwnerService(walletRepository)
  }

  async run(userId: User['id']): Promise<Wallet> {
    return await this._getWalletByIdService.run(userId)
  }
}
