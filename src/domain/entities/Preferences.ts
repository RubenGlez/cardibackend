import { Company } from "./Company"
import { User } from "./User"

export interface Preferences {
  id: string
  owner: User['id']

  companySelected?: Company['id']
  themeSelected?: string
  languageSelected?: string

  createdAt?: Date
  updatedAt?: Date
}
