import { Company } from "../../entities/Company"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { CompanyRepository } from "../../repositories/CompanyRepository"

export default class GetCompanyByIdService {
  private readonly _companyRepository: CompanyRepository

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run(id: Company['id']): Promise<Company> {
    const company = await this._companyRepository.getById(id)
    if (company === null) throw new OutputError(OutputErrorTypes.CompanyNotFound)
    return company
  }
}
