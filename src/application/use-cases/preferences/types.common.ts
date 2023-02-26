import { Preferences } from '../../../domain/entities/Preferences'
import { PreferencesRepository } from '../../../domain/repositories/PreferencesRepository'

type PreferencesToUpdate = Omit<
  Preferences,
  'id' | 'user' | 'createdAt' | 'updatedAt'
>

export interface GetPreferencesUseCaseDependencies {
  preferencesRepository: PreferencesRepository
}

export interface GetPreferencesUseCaseProps {
  tenantId: Preferences['owner']
}

export interface UpdatePreferencesUseCaseDependencies {
  preferencesRepository: PreferencesRepository
}

export interface UpdatePreferencesUseCaseProps extends PreferencesToUpdate {
  tenantId: Preferences['owner']
  preferencesId: Preferences['id']
}
