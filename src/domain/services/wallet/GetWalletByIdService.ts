import { Wallet } from '../../entities/Wallet'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { WalletRepository } from '../../repositories/WalletRepository'
import {
  GetWalletByIdServiceDependencies,
  GetWalletByIdServiceProps
} from './types'

export default class GetWalletByIdService {
  private readonly _walletRepository: WalletRepository

  constructor({ walletRepository }: GetWalletByIdServiceDependencies) {
    this._walletRepository = walletRepository
  }

  async run({ id }: GetWalletByIdServiceProps): Promise<Wallet> {
    const wallet = await this._walletRepository.getById(id)
    if (wallet === null) throw new OutputError(OutputErrorTypes.CardNotFound)
    return wallet
  }
}
