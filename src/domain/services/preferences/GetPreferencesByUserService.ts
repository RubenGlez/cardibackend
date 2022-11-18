import { Preferences } from "../../entities/Preferences"
import { User } from "../../entities/User"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { PreferencesRepository } from "../../repositories/PreferencesRepository"

export default class GetPreferencesByUserService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor(preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
  }

  async run(userId: User['id']): Promise<Preferences> {
    const preferences = await this._preferencesRepository.getByUserId(userId)
    if (preferences === null) throw new CardiError(CardiErrorTypes.PreferencesNotFound)
    return preferences
  }
}
