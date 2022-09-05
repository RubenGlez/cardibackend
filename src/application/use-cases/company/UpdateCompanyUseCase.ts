import {
  GetCompanyByIdService,
  Company,
  CompanyRepository,
  User,
  ResourceNotOwnedException,
} from '../../../domain'

type InputData = Pick<Company, 'id' | 'name' | 'description' | 'contact'>

export default class UpdateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService


  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Company> {
    const currentCompany = await this._getCompanyByIdService.run(inputData.id)
    if (currentCompany?.owner !== tenantId) throw new ResourceNotOwnedException()

    const companyToUpdate: Company = {
      ...currentCompany,
      name: inputData.name ?? currentCompany.name,
      description: inputData.description ?? currentCompany.description,
      contact: {
        ...currentCompany.contact,
        ...inputData.contact
      }
    }

    const companyUpdated = await this._companyRepository.update(companyToUpdate)
    return companyUpdated
  }
}
