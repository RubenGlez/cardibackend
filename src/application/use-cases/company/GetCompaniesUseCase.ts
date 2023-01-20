import { Company } from '../../../domain/entities/Company'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import {
  GetCompaniesUseCaseDependencies,
  GetCompaniesUseCaseProps
} from './types'

export default class GetCompaniesUseCase {
  private readonly _companyRepository: CompanyRepository

  constructor({ companyRepository }: GetCompaniesUseCaseDependencies) {
    this._companyRepository = companyRepository
  }

  async run({ tenantId }: GetCompaniesUseCaseProps): Promise<Company[]> {
    const companies = await this._companyRepository.getAllByOwner(tenantId)
    return companies
  }
}
