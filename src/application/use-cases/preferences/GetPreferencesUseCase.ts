import { GetPreferencesByUserService, Preferences, PreferencesRepository, User } from '../../../domain'

export default class GetPreferencesUseCase {
  private readonly _getPreferencesByUserService: GetPreferencesByUserService

  constructor (companyRepository: PreferencesRepository) {
    this._getPreferencesByUserService = new GetPreferencesByUserService(companyRepository)
  }

  async run (id: User['id']): Promise<Preferences> {
    return await this._getPreferencesByUserService.run(id)
  }
}
