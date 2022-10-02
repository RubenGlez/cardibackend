import { CardiError, CardiErrorTypes, Company, CompanyRepository } from '../../../domain'

export default class GetCompanyByIdService {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (id: Company['id']): Promise<Company> {
    const company = await this._companyRepository.getById(id)
    if (company === null) throw new CardiError(CardiErrorTypes.CompanyNotFound)
    return company
  }
}
