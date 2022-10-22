import {
  ExistCompanyByNameService,
  Company,
  CompanyRepository,
  User,
  CardiError,
  CardiErrorTypes,
} from '../../../domain'

type InputData = Pick<Company, 'name' | 'description' | 'contact'>

export default class CreateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existCompanyByNameService: ExistCompanyByNameService

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._existCompanyByNameService = new ExistCompanyByNameService(companyRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Company> {
    const existCompany = await this._existCompanyByNameService.run(inputData.name)
    if (existCompany) throw new CardiError(CardiErrorTypes.CompanyAlreadyExist)

    const companyToCreate: Company = {
      owner: tenantId,
      name: inputData.name,
      description: inputData.description,
      contact: inputData.contact
    }

    const companyCreated = await this._companyRepository.save(companyToCreate)
    return companyCreated
  }
}
