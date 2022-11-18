import { Company } from "../../entities/Company"
import { CompanyRepository } from "../../repositories/CompanyRepository"

export default class ExistCompanyByName {
  private readonly _companyRepository: CompanyRepository

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run(companyName: Company['name']): Promise<boolean> {
    const company = await this._companyRepository.getByName(companyName)
    if (company !== null) return true
    return false
  }
}
