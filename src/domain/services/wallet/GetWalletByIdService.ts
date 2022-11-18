import { Wallet } from "../../entities/Wallet"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { WalletRepository } from "../../repositories/WalletRepository"

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor(walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run(id: Wallet['id']): Promise<Wallet> {
    const wallet = await this._walletRepository.getById(id)
    if (wallet === null) throw new OutputError(OutputErrorTypes.CardNotFound)
    return wallet
  }
}
