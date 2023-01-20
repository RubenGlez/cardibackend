import { Card } from '../entities/Card'

export type CardRepositorySaveProps = Pick<
  Card,
  'owner' | 'company' | 'name' | 'color' | 'logo' | 'description'
>

export interface CardRepository {
  getAllByOwner: (owner: Card['owner']) => Promise<Card[]>
  getById: (id: Card['id']) => Promise<Card | null>
  save: (props: CardRepositorySaveProps) => Promise<Card>
  update: (inputData: Card) => Promise<Card>
  delete: (id: Card['id']) => Promise<void>
}
