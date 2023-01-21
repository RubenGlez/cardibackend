import { Preferences } from '../../../domain/entities/Preferences'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
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
    preferencesId,
    themeSelected,
    companySelected,
    languageSelected
  }: UpdatePreferencesUseCaseProps): Promise<Preferences> {
    const currentPreferences = await this._getPreferencesByUserService.run({
      tenantId
    })

    if (currentPreferences.id !== preferencesId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

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
