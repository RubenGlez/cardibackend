import { CardiError, CardiErrorTypes, Preferences, PreferencesRepository, User } from '../..'

export default class GetPreferencesByUserService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor (preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
  }

  async run (userId: User['id']): Promise<Preferences> {
    const preferences = await this._preferencesRepository.getByUserId(userId)
    if (preferences === null) throw new CardiError(CardiErrorTypes.PreferencesNotFound)
    return preferences
  }
}
