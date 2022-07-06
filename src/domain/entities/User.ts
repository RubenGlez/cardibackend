export interface User {
  id?: string
  email: string
  password: string
  username?: string
  role: UserRole
  lastLoginAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export enum UserRole {
  Basic = 'Basic',
  Business = 'Business',
  Admin = 'Admin',
}
