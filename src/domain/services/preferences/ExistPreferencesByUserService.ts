import { PreferencesRepository, User } from '../..'

export default class ExistPreferencesByUser {
  private readonly _preferencesRepository: PreferencesRepository

  constructor (preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
  }

  async run (userId: User['id']): Promise<boolean> {
    const preferences = await this._preferencesRepository.getByUserId(userId)
    if (preferences !== null) return true
    return false
  }
}
