import { Company } from '../../../domain/entities/Company'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import {
  CompanyRepository,
  CompanyRepositorySaveProps
} from '../../../domain/repositories/CompanyRepository'
import ExistCompanyByNameService from '../../../domain/services/company/ExistCompanyByNameService'
import {
  CreateCompanyUseCaseDependencies,
  CreateCompanyUseCaseProps
} from './types'

export default class CreateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existCompanyByNameService: ExistCompanyByNameService

  constructor({ companyRepository }: CreateCompanyUseCaseDependencies) {
    this._companyRepository = companyRepository
    this._existCompanyByNameService = new ExistCompanyByNameService({
      companyRepository
    })
  }

  async run({
    tenantId,
    name,
    description,
    contact
  }: CreateCompanyUseCaseProps): Promise<Company> {
    const existCompany = await this._existCompanyByNameService.run({
      companyName: name
    })
    if (existCompany) {
      throw new OutputError(OutputErrorTypes.CompanyAlreadyExist)
    }
    const companyToCreate: CompanyRepositorySaveProps = {
      owner: tenantId,
      name,
      description,
      contact
    }

    const companyCreated = await this._companyRepository.save(companyToCreate)
    return companyCreated
  }
}
