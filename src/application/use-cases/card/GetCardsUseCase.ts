import { Card, CardRepository, User } from '../../../domain'

export default class GetCardsUseCase {
  private readonly _companyRepository: CardRepository

  constructor (companyRepository: CardRepository) {
    this._companyRepository = companyRepository
  }

  async run (tenantId: User['id']): Promise<Card[]> {
    const companies = await this._companyRepository.getAllByOwner(tenantId)
    return companies
  }
}
