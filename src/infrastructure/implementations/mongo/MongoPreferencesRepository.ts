import { Preferences } from "../../../domain/entities/Preferences"
import { User } from "../../../domain/entities/User"
import { PreferencesRepository } from "../../../domain/repositories/PreferencesRepository"
import PreferencesModel from "../../driven-adapters/mongoose/models/PreferencesModel"


export default class MongoPreferencesRepository implements PreferencesRepository {
  private readonly _model = PreferencesModel

  private toDto(preferencesToMap: any): Preferences {
    const preferencesDTO = Object.assign({ id: preferencesToMap._id?.toString() }, preferencesToMap)
    delete preferencesDTO._id
    delete preferencesDTO.__v

    preferencesDTO.user = preferencesDTO.user?.toString()
    preferencesDTO.companySelected = preferencesDTO.companySelected?.toString()

    return preferencesDTO
  }


  async getByUserId(userId: User['id']): Promise<Preferences | null> {
    const preferencesFound = await this._model.findOne({ user: userId }).lean()
    if (preferencesFound === null) return null
    const preferencesMapped = this.toDto(preferencesFound)
    return preferencesMapped
  }

  async save(inputData: Preferences): Promise<Preferences> {
    const preferencesToCreate = new this._model(inputData)
    const preferencesCreated = await preferencesToCreate.save()
    const preferencesMapped = this.toDto(preferencesCreated.toObject())
    return preferencesMapped
  }

  async update(inputData: Preferences): Promise<Preferences> {
    const preferencesUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    ).lean()
    const preferencesMapped = this.toDto(preferencesUpdated)
    return preferencesMapped
  }
}
