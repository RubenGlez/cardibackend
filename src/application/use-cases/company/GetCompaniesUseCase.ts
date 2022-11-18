import { Company } from "../../../domain/entities/Company"
import { User } from "../../../domain/entities/User"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"

export default class GetCompaniesUseCase {
  private readonly _companyRepository: CompanyRepository

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run(tenantId: User['id']): Promise<Company[]> {
    const companies = await this._companyRepository.getAllByOwner(tenantId)
    return companies
  }
}
