import { Wallet } from '../../../domain/entities/Wallet'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { WalletRepository } from '../../../domain/repositories/WalletRepository'
import GetWalletByIdService from '../../../domain/services/wallet/GetWalletByOwnerService'
import {
  UpdateWalletUseCaseDependencies,
  UpdateWalletUseCaseProps
} from './types'

export default class UpdateWalletUseCase {
  private readonly _walletRepository: WalletRepository
  private readonly _getWalletByIdService: GetWalletByIdService

  constructor({ walletRepository }: UpdateWalletUseCaseDependencies) {
    this._walletRepository = walletRepository
    this._getWalletByIdService = new GetWalletByIdService({ walletRepository })
  }

  async run({
    tenantId,
    id,
    cards
  }: UpdateWalletUseCaseProps): Promise<Wallet> {
    const currentWallet = await this._getWalletByIdService.run({ owner: id })
    if (currentWallet?.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const walletToUpdate: Wallet = {
      ...currentWallet,
      cards: cards ?? currentWallet.cards
    }

    const walletUpdated = await this._walletRepository.update(walletToUpdate)
    return walletUpdated
  }
}
