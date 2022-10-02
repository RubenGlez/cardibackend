import {
  ExistCompanyByNameService,
  Company,
  CompanyRepository,
  User,
  UserRepository,
  UserHasBusinessRoleService,
  CardiError,
  CardiErrorTypes,
} from '../../../domain'

type InputData = Pick<Company, 'name' | 'description' | 'contact'>

export default class CreateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existCompanyByNameService: ExistCompanyByNameService
  private readonly _userHasBusinessRoleService: UserHasBusinessRoleService

  constructor (companyRepository: CompanyRepository, userRepository: UserRepository) {
    this._companyRepository = companyRepository
    this._existCompanyByNameService = new ExistCompanyByNameService(companyRepository)
    this._userHasBusinessRoleService = new UserHasBusinessRoleService(userRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Company> {
    const userHasBusinessRole = await this._userHasBusinessRoleService.run(tenantId)
    if (!userHasBusinessRole) throw new CardiError(CardiErrorTypes.InvalidUserRole)

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
