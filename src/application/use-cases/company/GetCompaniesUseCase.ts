import { Company, CompanyRepository } from '../../../domain'

export default class GetCompaniesUseCase {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (): Promise<Company[]> {
    const companies = await this._companyRepository.getAll()
    return companies
  }
}
