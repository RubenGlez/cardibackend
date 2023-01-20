import { User } from './User'

export interface Contact {
  phone: string
  email: string
  web?: string
}

export interface Company {
  id: string
  owner: User['id']
  name: string
  description?: string
  contact: Contact
  createdAt?: Date
  updatedAt?: Date
}
