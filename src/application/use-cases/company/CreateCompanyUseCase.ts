import { Company } from "../../../domain/entities/Company"
import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import ExistCompanyByNameService from "../../../domain/services/company/ExistCompanyByNameService"


type InputData = Pick<Company, 'name' | 'description' | 'contact'>

export default class CreateCompanyUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existCompanyByNameService: ExistCompanyByNameService

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._existCompanyByNameService = new ExistCompanyByNameService(companyRepository)
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Company> {
    const existCompany = await this._existCompanyByNameService.run(inputData.name)
    if (existCompany) throw new OutputError(OutputErrorTypes.CompanyAlreadyExist)

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
