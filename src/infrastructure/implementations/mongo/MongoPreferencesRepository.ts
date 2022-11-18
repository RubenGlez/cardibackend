import { Preferences } from "../../../domain/entities/Preferences"
import { User } from "../../../domain/entities/User"
import { PreferencesRepository } from "../../../domain/repositories/PreferencesRepository"
import PreferencesModel from "../../driven-adapters/mongoose/models/PreferencesModel"

export default class MongoPreferencesRepository implements PreferencesRepository {
  private readonly _model = PreferencesModel

  private map(preferencesToMap: any): Preferences {
    const preferences = preferencesToMap.toObject({ versionKey: false })
    preferences.id = preferences._id.toString()
    delete preferences._id
    preferences.user = preferences.user.toString()
    preferences.companySelected = preferences.companySelected?.toString()
    return preferences as Preferences
  }


  async getByUserId(userId: User['id']): Promise<Preferences | null> {
    const preferencesFound = await this._model.findOne({ user: userId })
    if (preferencesFound === null) return null
    const preferencesMapped = this.map(preferencesFound)
    return preferencesMapped
  }

  async save(inputData: Preferences): Promise<Preferences> {
    const preferencesToCreate = new this._model(inputData)
    const preferencesCreated = await preferencesToCreate.save()
    const preferencesMapped = this.map(preferencesCreated)
    return preferencesMapped
  }

  async update(inputData: Preferences): Promise<Preferences> {
    const preferencesUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    const preferencesMapped = this.map(preferencesUpdated)
    return preferencesMapped
  }

  async delete(id: Preferences['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
