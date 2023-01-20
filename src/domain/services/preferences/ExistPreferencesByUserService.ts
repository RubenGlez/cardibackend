import { PreferencesRepository } from '../../repositories/PreferencesRepository'
import {
  ExistPreferencesByUserServiceDependencies,
  ExistPreferencesByUserServiceProps
} from './types'

export default class ExistPreferencesByUserService {
  private readonly _preferencesRepository: PreferencesRepository

  constructor({
    preferencesRepository
  }: ExistPreferencesByUserServiceDependencies) {
    this._preferencesRepository = preferencesRepository
  }

  async run({ userId }: ExistPreferencesByUserServiceProps): Promise<boolean> {
    const preferences = await this._preferencesRepository.getByUserId(userId)
    if (preferences !== null) return true
    return false
  }
}
