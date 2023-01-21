import { Company } from '../../entities/Company'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { CompanyRepository } from '../../repositories/CompanyRepository'
import {
  GetCompanyByIdServiceDependencies,
  GetCompanyByIdServiceProps
} from './types'

export default class GetCompanyByIdService {
  private readonly _companyRepository: CompanyRepository

  constructor({ companyRepository }: GetCompanyByIdServiceDependencies) {
    this._companyRepository = companyRepository
  }

  async run({ companyId }: GetCompanyByIdServiceProps): Promise<Company> {
    const company = await this._companyRepository.getById(companyId)
    if (company === null)
      throw new OutputError(OutputErrorTypes.CompanyNotFound)
    return company
  }
}
