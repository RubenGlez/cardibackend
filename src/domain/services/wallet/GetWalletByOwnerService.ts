import { User } from "../../entities/User"
import { Wallet } from "../../entities/Wallet"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { WalletRepository } from "../../repositories/WalletRepository"

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor(walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run(userId: User['id']): Promise<Wallet> {
    const wallet = await this._walletRepository.getByOwner(userId)
    if (wallet === null) throw new CardiError(CardiErrorTypes.WalletNotFound)
    return wallet
  }
}
