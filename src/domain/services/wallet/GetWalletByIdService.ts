import { CardiError, CardiErrorTypes, Wallet, WalletRepository } from '../..'

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor (walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run (id: Wallet['id']): Promise<Wallet> {
    const wallet = await this._walletRepository.getById(id)
    if (wallet === null) throw new CardiError(CardiErrorTypes.CardNotFound)
    return wallet
  }
}
