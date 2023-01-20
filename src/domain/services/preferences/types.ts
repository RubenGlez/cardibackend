import { Preferences } from '../../entities/Preferences'
import { PreferencesRepository } from '../../repositories/PreferencesRepository'

export interface ExistPreferencesByUserServiceDependencies {
  preferencesRepository: PreferencesRepository
}

export interface ExistPreferencesByUserServiceProps {
  userId: Preferences['owner']
}

export interface GetPreferencesByUserServiceDependencies {
  preferencesRepository: PreferencesRepository
}

export interface GetPreferencesByUserServiceProps {
  userId: Preferences['owner']
}

export interface GetPreferencesByIdServiceDependencies {
  preferencesRepository: PreferencesRepository
}

export interface GetPreferencesByIdServiceProps {
  id: Preferences['id']
}
