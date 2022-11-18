import { Preferences } from "../../../domain/entities/Preferences"
import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { PreferencesRepository } from "../../../domain/repositories/PreferencesRepository"
import ExistPreferencesByUserService from "../../../domain/services/preferences/ExistPreferencesByUserService"


type InputData = Preferences

export default class CreatePreferencesUseCase {
  private readonly _preferencesRepository: PreferencesRepository
  private readonly _existPreferencesByUserService: ExistPreferencesByUserService

  constructor(preferencesRepository: PreferencesRepository) {
    this._preferencesRepository = preferencesRepository
    this._existPreferencesByUserService = new ExistPreferencesByUserService(preferencesRepository)
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Preferences> {
    const existPreferences = await this._existPreferencesByUserService.run(tenantId)
    if (existPreferences) throw new OutputError(OutputErrorTypes.PreferencesAlreadyExist)

    const preferencesToCreate: Preferences = {
      user: tenantId,
      companySelected: inputData.companySelected ?? '',
      themeSelected: inputData.themeSelected ?? ''
    }

    const preferencesCreated = await this._preferencesRepository.save(preferencesToCreate)
    return preferencesCreated
  }
}
