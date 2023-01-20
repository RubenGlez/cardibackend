import { CompanyRepository } from '../../repositories/CompanyRepository'
import {
  ExistCompanyByNameServiceDependencies,
  ExistCompanyByNameServiceProps
} from './types'

export default class ExistCompanyByNameService {
  private readonly _companyRepository: CompanyRepository

  constructor({ companyRepository }: ExistCompanyByNameServiceDependencies) {
    this._companyRepository = companyRepository
  }

  async run({ companyName }: ExistCompanyByNameServiceProps): Promise<boolean> {
    const company = await this._companyRepository.getByName(companyName)
    if (company !== null) return true
    return false
  }
}
