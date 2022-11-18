import { Company } from "../../../domain/entities/Company"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import GetCompanyByIdService from "../../../domain/services/company/GetCompanyByIdService"

export default class GetCompanyUseCase {
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor(companyRepository: CompanyRepository) {
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run(id: Company['id']): Promise<Company> {
    return await this._getCompanyByIdService.run(id)
  }
}
