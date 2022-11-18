import { Company } from "../../../domain/entities/Company"
import { User } from "../../../domain/entities/User"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import CompanyModel from "../../driven-adapters/mongoose/models/CompanyModel"


export default class MongoCompanyRepository implements CompanyRepository {
  private readonly _model = CompanyModel

  private map(companyToMap: any): Company {
    const company = companyToMap.toObject({ versionKey: false })
    company.id = company._id.toString()
    delete company._id
    company.owner = company.owner.toString()
    return company as Company
  }

  async getAllByOwner(owner: User['id']): Promise<Company[]> {
    const allCompanys = await this._model.find({ owner })
    if (allCompanys.length === 0) return allCompanys
    const allCompanysMapped = allCompanys.map((company) => this.map(company))
    return allCompanysMapped
  }

  async getByName(name: Company['name']): Promise<Company | null> {
    const companyFound = await this._model.findOne({ name })
    if (companyFound === null) return null
    const companyMapped = this.map(companyFound)
    return companyMapped
  }

  async getById(id: Company['id']): Promise<Company | null> {
    const companyFound = await this._model.findById(id)
    if (companyFound === null) return null
    const companyMapped = this.map(companyFound)
    return companyMapped
  }

  async save(inputData: Company): Promise<Company> {
    const companyToCreate = new this._model(inputData)
    const companyCreated = await companyToCreate.save()
    const companyMapped = this.map(companyCreated)
    return companyMapped
  }

  async update(inputData: Company): Promise<Company> {
    const companyUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    const companyMapped = this.map(companyUpdated)
    return companyMapped
  }

  async delete(id: Company['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
