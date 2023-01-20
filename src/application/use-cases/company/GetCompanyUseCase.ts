import { Company } from '../../../domain/entities/Company'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'
import { GetCompanyUseCaseDependencies, GetCompanyUseCaseProps } from './types'

export default class GetCompanyUseCase {
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor({ companyRepository }: GetCompanyUseCaseDependencies) {
    this._getCompanyByIdService = new GetCompanyByIdService({
      companyRepository
    })
  }

  async run({ id }: GetCompanyUseCaseProps): Promise<Company> {
    return await this._getCompanyByIdService.run({ id })
  }
}
