import { User } from "../../../domain/entities/User"
import { Wallet } from "../../../domain/entities/Wallet"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { WalletRepository } from "../../../domain/repositories/WalletRepository"
import { GetWalletByIdService } from "../../../domain/services/wallet"

type InputData = Omit<Wallet, 'owner' | 'company'>

export default class UpdateWalletUseCase {
  private readonly _walletRepository: WalletRepository
  private readonly _getWalletByIdService: GetWalletByIdService


  constructor(walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
    this._getWalletByIdService = new GetWalletByIdService(walletRepository)
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Wallet> {
    const currentWallet = await this._getWalletByIdService.run(inputData.id)
    if (currentWallet?.owner !== tenantId) throw new OutputError(OutputErrorTypes.NotOwned)

    const walletToUpdate: Wallet = {
      ...currentWallet,
      cards: inputData.cards ?? currentWallet.cards,
    }

    const walletUpdated = await this._walletRepository.update(walletToUpdate)
    return walletUpdated
  }
}
