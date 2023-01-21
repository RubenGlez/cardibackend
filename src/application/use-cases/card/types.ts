import { Card } from '../../../domain/entities/Card'
import { CardRepository } from '../../../domain/repositories/CardRepository'

type CardToCreate = Pick<
  Card,
  'name' | 'company' | 'color' | 'description' | 'logo'
>
type CardToUpdate = Pick<Card, 'id' | 'name' | 'color' | 'logo' | 'description'>

export interface CreateCardUseCaseDependencies {
  cardRepository: CardRepository
}

export interface CreateCardUseCaseProps extends CardToCreate {
  tenantId: Card['owner']
}

export interface DeleteCardUseCaseDependencies {
  cardRepository: CardRepository
}

export interface DeleteCardUseCaseProps {
  tenantId: Card['owner']
  cardId: Card['id']
}

export interface GetCardsUseCaseDependencies {
  cardRepository: CardRepository
}

export interface GetCardsUseCaseProps {
  tenantId: Card['owner']
}

export interface GetCardUseCaseDependencies {
  cardRepository: CardRepository
}

export interface GetCardUseCaseProps {
  cardId: Card['id']
}

export interface UpdateCardUseCaseDependencies {
  cardRepository: CardRepository
}

export interface UpdateCardUseCaseProps extends CardToUpdate {
  tenantId: Card['owner']
  cardId: Card['id']
}
