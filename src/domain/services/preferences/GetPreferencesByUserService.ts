import { Preferences } from "../../entities/Preferences"
import { User } from "../../entities/User"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { PreferencesRepository } from "../../repositories/PreferencesRepository"

export default class GetPreferencesByUserService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor(preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
  }

  async run(userId: User['id']): Promise<Preferences> {
    const preferences = await this._preferencesRepository.getByUserId(userId)
    if (preferences === null) throw new OutputError(OutputErrorTypes.PreferencesNotFound)
    return preferences
  }
}
