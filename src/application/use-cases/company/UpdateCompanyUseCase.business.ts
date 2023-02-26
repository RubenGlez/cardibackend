import { Company } from '../../../domain/entities/Company'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'
import {
  UpdateCompanyUseCaseDependencies,
  UpdateCompanyUseCaseProps
} from './types.business'

export default class UpdateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor({ companyRepository }: UpdateCompanyUseCaseDependencies) {
    this._companyRepository = companyRepository
    this._getCompanyByIdService = new GetCompanyByIdService({
      companyRepository
    })
  }

  async run({
    tenantId,
    companyId,
    name,
    description,
    contact
  }: UpdateCompanyUseCaseProps): Promise<Company> {
    const currentCompany = await this._getCompanyByIdService.run({ companyId })
    if (currentCompany?.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const companyToUpdate: Company = {
      ...currentCompany,
      name: name ?? currentCompany.name,
      description: description ?? currentCompany.description,
      contact: {
        ...currentCompany.contact,
        ...contact
      }
    }

    const companyUpdated = await this._companyRepository.update(companyToUpdate)
    return companyUpdated
  }
}
