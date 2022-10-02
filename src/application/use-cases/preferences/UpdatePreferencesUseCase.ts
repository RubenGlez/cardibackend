import {
  GetPreferencesByUserService,
  Preferences,
  PreferencesRepository,
  User,
} from '../../../domain'

type InputData = Omit<Preferences, 'id' | 'user' | 'createdAt' | 'updatedAt'>

export default class UpdatePreferencesUseCase {
  private readonly _preferencesRepository: PreferencesRepository
  private readonly _getPreferencesByUserService: GetPreferencesByUserService


  constructor (preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
    this._getPreferencesByUserService = new GetPreferencesByUserService(preferencesRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Preferences> {
    const currentPreferences = await this._getPreferencesByUserService.run(tenantId)

    const preferencesToUpdate: Preferences = {
      ...currentPreferences,
      themeSelected: inputData.themeSelected ?? currentPreferences.themeSelected,
      companySelected: inputData.companySelected ?? currentPreferences.companySelected,
      languageSelected: inputData.languageSelected ?? currentPreferences.languageSelected,
    }

    const preferencesUpdated = await this._preferencesRepository.update(preferencesToUpdate)
    return preferencesUpdated
  }
}
