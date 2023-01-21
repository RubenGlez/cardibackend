import { Preferences } from '../../../domain/entities/Preferences'
import GetPreferencesByUserService from '../../../domain/services/preferences/GetPreferencesByUserService'
import {
  GetPreferencesUseCaseDependencies,
  GetPreferencesUseCaseProps
} from './types'

export default class GetPreferencesUseCase {
  private readonly _getPreferencesByUserService: GetPreferencesByUserService

  constructor({ preferencesRepository }: GetPreferencesUseCaseDependencies) {
    this._getPreferencesByUserService = new GetPreferencesByUserService({
      preferencesRepository
    })
  }

  async run({ tenantId }: GetPreferencesUseCaseProps): Promise<Preferences> {
    return await this._getPreferencesByUserService.run({ tenantId })
  }
}
