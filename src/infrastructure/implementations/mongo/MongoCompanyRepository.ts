import { Company } from "../../../domain/entities/Company"
import { User } from "../../../domain/entities/User"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import CompanyModel from "../../driven-adapters/mongoose/models/CompanyModel"


export default class MongoCompanyRepository implements CompanyRepository {
  private readonly _model = CompanyModel

  private toDto(companyToMap: any): Company {
    const companyDTO = Object.assign({ id: companyToMap._id?.toString() }, companyToMap)
    delete companyDTO._id
    delete companyDTO.__v
    companyDTO.owner = companyDTO.owner?.toString()
    return companyDTO
  }

  async getAllByOwner(owner: User['id']): Promise<Company[]> {
    const allCompanys = await this._model.find({ owner }).lean({})
    if (allCompanys.length === 0) return allCompanys
    const allCompanysMapped = allCompanys.map((company) => this.toDto(company))
    return allCompanysMapped
  }

  async getByName(name: Company['name']): Promise<Company | null> {
    const companyFound = await this._model.findOne({ name }).lean()
    if (companyFound === null) return null
    const companyMapped = this.toDto(companyFound)
    return companyMapped
  }

  async getById(id: Company['id']): Promise<Company | null> {
    const companyFound = await this._model.findById(id).lean()
    if (companyFound === null) return null
    const companyMapped = this.toDto(companyFound)
    return companyMapped
  }

  async save(inputData: Company): Promise<Company> {
    const companyToCreate = new this._model(inputData)
    const companyCreated = await companyToCreate.save()
    const companyMapped = this.toDto(companyCreated.toObject())
    return companyMapped
  }

  async update(inputData: Company): Promise<Company> {
    const companyUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    ).lean()
    const companyMapped = this.toDto(companyUpdated)
    return companyMapped
  }

  async delete(id: Company['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
