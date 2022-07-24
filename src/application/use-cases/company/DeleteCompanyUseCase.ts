import {
  GetCompanyByIdService,
  Company,
  CompanyRepository,
  ResourceNotOwnedException
} from '../../../domain'

export default class DeleteCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run (
    companyId: Company['id'],
    tenantId: Company['id']
  ): Promise<void> {
    const companyToDelete = await this._getCompanyByIdService.run(companyId)
    if (companyToDelete.owner !== tenantId) throw new ResourceNotOwnedException()
  
    await this._companyRepository.delete(companyToDelete.id)
  }
}
