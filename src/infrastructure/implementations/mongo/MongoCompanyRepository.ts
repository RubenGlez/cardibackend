import {
  Company,
  CompanyRepository
} from '../../../domain'
import { CompanyModel } from '../..'

export default class MongoCompanyRepository implements CompanyRepository {
  private readonly _model = CompanyModel

  private map (CompanyToMap: any): Company {
    const Company = CompanyToMap.toObject({ versionKey: false })
    Company.id = Company._id
    delete Company._id
    return Company as Company
  }

  async getAll (): Promise<Company[]> {
    const allCompanys = await this._model.find()
    if (allCompanys.length === 0) return [] as Company[]
    const allCompanysMapped = allCompanys.map((Company) => this.map(Company))
    return allCompanysMapped
  }

  async getByName (name: Company['name']): Promise<Company | null> {
    const companyFound = await this._model.findOne({ name })
    if (companyFound === null) return null
    const companyMapped = this.map(companyFound)
    return companyMapped
  }

  async getById (id: Company['id']): Promise<Company | null> {
    const CompanyFound = await this._model.findById(id)
    if (CompanyFound === null) return null
    const CompanyMapped = this.map(CompanyFound)
    return CompanyMapped
  }

  async save (inputData: Company): Promise<Company> {
    const CompanyToCreate = new this._model(inputData)
    const CompanyCreated = await CompanyToCreate.save()
    const CompanyMapped = this.map(CompanyCreated)
    return CompanyMapped
  }

  async update (inputData: Company): Promise<Company> {
    const CompanyUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { new: true }
    )
    const CompanyMapped = this.map(CompanyUpdated)
    return CompanyMapped
  }

  async delete (id: Company['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
