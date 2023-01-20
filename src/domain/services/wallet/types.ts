import { Wallet } from '../../entities/Wallet'
import { WalletRepository } from '../../repositories/WalletRepository'

export interface GetWalletByIdServiceDependencies {
  walletRepository: WalletRepository
}

export interface GetWalletByIdServiceProps {
  id: Wallet['id']
}

export interface GetWalletByOwnerServiceDependencies {
  walletRepository: WalletRepository
}

export interface GetWalletByOwnerServiceProps {
  owner: Wallet['owner']
}
