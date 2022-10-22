import {
  User,
  Wallet,
  WalletRepository,
} from '../../../domain'

type InputData = Wallet

export default class CreateWalletUseCase {
  private readonly _walletRepository: WalletRepository

  constructor (walletRepository: WalletRepository) {
    this._walletRepository = walletRepository
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Wallet> {
    const walletToCreate: Wallet = {
      owner: tenantId,
      cards: inputData.cards,
    }

    const walletCreated = await this._walletRepository.save(walletToCreate)
    return walletCreated
  }
}
