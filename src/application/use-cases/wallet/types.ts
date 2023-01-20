import { Wallet } from '../../../domain/entities/Wallet'
import { WalletRepository } from '../../../domain/repositories/WalletRepository'

type WalletToCreate = Pick<Wallet, 'cards'>
type WalletToUpdate = Pick<Wallet, 'id' | 'cards'>

export interface CreateWalletUseCaseDependencies {
  walletRepository: WalletRepository
}

export interface CreateWalletUseCaseProps extends WalletToCreate {
  tenantId: Wallet['owner']
}

export interface GetWalletUseCaseDependencies {
  walletRepository: WalletRepository
}

export interface GetWalletUseCaseProps {
  tenantId: Wallet['owner']
}

export interface UpdateWalletUseCaseDependencies {
  walletRepository: WalletRepository
}

export interface UpdateWalletUseCaseProps extends WalletToUpdate {
  tenantId: Wallet['owner']
}
