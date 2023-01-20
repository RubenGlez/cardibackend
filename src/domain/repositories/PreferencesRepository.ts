import { Preferences } from '../entities/Preferences'

export type PreferencesRepositorySaveProps = Pick<Preferences, 'owner'>

export interface PreferencesRepository {
  getByUserId: (id: Preferences['owner']) => Promise<Preferences | null>
  getById: (id: Preferences['id']) => Promise<Preferences | null>
  save: (props: PreferencesRepositorySaveProps) => Promise<Preferences>
  update: (inputData: Preferences) => Promise<Preferences>
}
