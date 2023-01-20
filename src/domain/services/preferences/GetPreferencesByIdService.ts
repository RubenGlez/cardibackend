import { Preferences } from '../../entities/Preferences'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { PreferencesRepository } from '../../repositories/PreferencesRepository'
import {
  GetPreferencesByIdServiceDependencies,
  GetPreferencesByIdServiceProps
} from './types'

export default class GetPreferencesByIdService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor({
    preferencesRepository
  }: GetPreferencesByIdServiceDependencies) {
    this._preferencesRepository = preferencesRepository
  }

  async run({ id }: GetPreferencesByIdServiceProps): Promise<Preferences> {
    const preferences = await this._preferencesRepository.getById(id)
    if (preferences === null)
      throw new OutputError(OutputErrorTypes.PreferencesNotFound)
    return preferences
  }
}
