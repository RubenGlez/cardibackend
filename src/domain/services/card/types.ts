import { Card } from '../../entities/Card'
import { CardRepository } from '../../repositories/CardRepository'

export interface GetCardByIdServiceDependencies {
  cardRepository: CardRepository
}

export interface GetCardByIdServiceProps {
  id: Card['id']
}
