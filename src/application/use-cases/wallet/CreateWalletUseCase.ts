import { Wallet } from '../../../domain/entities/Wallet'
import {
  WalletRepository,
  WalletRepositorySaveProps
} from '../../../domain/repositories/WalletRepository'
import {
  CreateWalletUseCaseDependencies,
  CreateWalletUseCaseProps
} from './types'

export default class CreateWalletUseCase {
  private readonly _walletRepository: WalletRepository

  constructor({ walletRepository }: CreateWalletUseCaseDependencies) {
    this._walletRepository = walletRepository
  }

  async run({ cards, tenantId }: CreateWalletUseCaseProps): Promise<Wallet> {
    const walletToCreate: WalletRepositorySaveProps = {
      owner: tenantId,
      cards
    }

    const walletCreated = await this._walletRepository.save(walletToCreate)
    return walletCreated
  }
}
