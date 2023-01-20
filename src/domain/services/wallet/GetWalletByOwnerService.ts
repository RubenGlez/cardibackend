import { Wallet } from '../../entities/Wallet'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { WalletRepository } from '../../repositories/WalletRepository'
import {
  GetWalletByOwnerServiceDependencies,
  GetWalletByOwnerServiceProps
} from './types'

export default class GetWalletByOwnerService {
  private readonly _walletRepository: WalletRepository

  constructor({ walletRepository }: GetWalletByOwnerServiceDependencies) {
    this._walletRepository = walletRepository
  }

  async run({ owner }: GetWalletByOwnerServiceProps): Promise<Wallet> {
    const wallet = await this._walletRepository.getByOwner(owner)
    if (wallet === null) throw new OutputError(OutputErrorTypes.WalletNotFound)
    return wallet
  }
}
