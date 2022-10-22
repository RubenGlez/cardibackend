import { CardiError, CardiErrorTypes, User, Wallet, WalletRepository } from '../..'

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor (walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run (userId: User['id']): Promise<Wallet> {
    const wallet = await this._walletRepository.getByOwner(userId)
    if (wallet === null) throw new CardiError(CardiErrorTypes.WalletNotFound)
    return wallet
  }
}
