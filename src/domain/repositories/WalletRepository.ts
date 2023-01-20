import { Wallet } from '../entities/Wallet'

export type WalletRepositorySaveProps = Pick<Wallet, 'owner' | 'cards'>

export interface WalletRepository {
  getByOwner: (owner: Wallet['owner']) => Promise<Wallet | null>
  getById: (id: Wallet['id']) => Promise<Wallet | null>
  save: (props: WalletRepositorySaveProps) => Promise<Wallet>
  update: (inputData: Wallet) => Promise<Wallet>
  delete: (id: Wallet['id']) => Promise<void>
}
