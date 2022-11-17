import { Preferences, User } from '..'

export interface PreferencesRepository {
  getByUserId: (id: User['id']) => Promise<Preferences | null>
  save: (inputData: Preferences) => Promise<Preferences>
  update: (inputData: Preferences) => Promise<Preferences>
}
