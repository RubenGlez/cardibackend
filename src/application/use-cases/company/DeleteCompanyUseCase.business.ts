import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'
import {
  DeleteCompanyUseCaseDependencies,
  DeleteCompanyUseCaseProps
} from './types.business'

export default class DeleteCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor({ companyRepository }: DeleteCompanyUseCaseDependencies) {
    this._companyRepository = companyRepository
    this._getCompanyByIdService = new GetCompanyByIdService({
      companyRepository
    })
  }

  async run({ companyId, tenantId }: DeleteCompanyUseCaseProps): Promise<void> {
    const companyToDelete = await this._getCompanyByIdService.run({ companyId })
    if (companyToDelete.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    // TODO: improve this flow
    // has cards?
    // -> no : delete
    // -> yes : trow error "must delete cards firstly"

    await this._companyRepository.delete(companyToDelete.id)
  }
}
