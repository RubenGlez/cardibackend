import { User } from "../entities/User"
import { Wallet } from "../entities/Wallet"

export interface WalletRepository {
  getByOwner: (owner: User['id']) => Promise<Wallet | null>
  getById: (id: Wallet['id']) => Promise<Wallet | null>
  save: (inputData: Wallet) => Promise<Wallet>
  update: (inputData: Wallet) => Promise<Wallet>
  delete: (id: Wallet['id']) => Promise<void>
}
