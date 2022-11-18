import { Company } from "../../../domain/entities/Company"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import GetCompanyByIdService from "../../../domain/services/company/GetCompanyByIdService"

export default class DeleteCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run(
    companyId: Company['id'],
    tenantId: Company['id']
  ): Promise<void> {
    const companyToDelete = await this._getCompanyByIdService.run(companyId)
    if (companyToDelete.owner !== tenantId) throw new OutputError(OutputErrorTypes.NotOwned)

    // has cards?
    // -> no : delete
    // -> yes : trow error "must delete cards firstly"

    await this._companyRepository.delete(companyToDelete.id)
  }
}
