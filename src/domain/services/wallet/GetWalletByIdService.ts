import { Wallet } from "../../entities/Wallet"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { WalletRepository } from "../../repositories/WalletRepository"

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor(walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run(id: Wallet['id']): Promise<Wallet> {
    const wallet = await this._walletRepository.getById(id)
    if (wallet === null) throw new CardiError(CardiErrorTypes.CardNotFound)
    return wallet
  }
}
