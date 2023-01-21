import { Preferences } from '../../entities/Preferences'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { PreferencesRepository } from '../../repositories/PreferencesRepository'
import {
  GetPreferencesByUserServiceDependencies,
  GetPreferencesByUserServiceProps
} from './types'

export default class GetPreferencesByUserService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor({
    preferencesRepository
  }: GetPreferencesByUserServiceDependencies) {
    this._preferencesRepository = preferencesRepository
  }

  async run({
    tenantId
  }: GetPreferencesByUserServiceProps): Promise<Preferences> {
    const preferences = await this._preferencesRepository.getByUserId(tenantId)
    if (preferences === null)
      throw new OutputError(OutputErrorTypes.PreferencesNotFound)
    return preferences
  }
}
