import { Preferences } from '../../../domain/entities/Preferences'
import { PreferencesRepository } from '../../../domain/repositories/PreferencesRepository'
import GetPreferencesByUserService from '../../../domain/services/preferences/GetPreferencesByUserService'
import {
  UpdatePreferencesUseCaseDependencies,
  UpdatePreferencesUseCaseProps
} from './types'

export default class UpdatePreferencesUseCase {
  private readonly _preferencesRepository: PreferencesRepository
  private readonly _getPreferencesByUserService: GetPreferencesByUserService

  constructor({ preferencesRepository }: UpdatePreferencesUseCaseDependencies) {
    this._preferencesRepository = preferencesRepository
    this._getPreferencesByUserService = new GetPreferencesByUserService({
      preferencesRepository
    })
  }

  async run({
    tenantId,
    themeSelected,
    companySelected,
    languageSelected
  }: UpdatePreferencesUseCaseProps): Promise<Preferences> {
    const currentPreferences = await this._getPreferencesByUserService.run({
      userId: tenantId
    })

    const preferencesToUpdate: Preferences = {
      ...currentPreferences,
      themeSelected: themeSelected ?? currentPreferences.themeSelected,
      companySelected: companySelected ?? currentPreferences.companySelected,
      languageSelected: languageSelected ?? currentPreferences.languageSelected
    }

    const preferencesUpdated = await this._preferencesRepository.update(
      preferencesToUpdate
    )
    return preferencesUpdated
  }
}
