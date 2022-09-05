import { Company, CompanyRepository, User } from '../../../domain'

export default class GetCompaniesUseCase {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (tenantId: User['id']): Promise<Company[]> {
    const companies = await this._companyRepository.getAllByOwner(tenantId)
    return companies
  }
}
