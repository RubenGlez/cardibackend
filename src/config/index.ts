import * as dotenv from 'dotenv'
dotenv.config()

// Environment variables
export const ENVIRONMENT = String(process.env.ENVIRONMENT)
export const DATABASE = String(process.env.DATABASE)
export const PORT = Number(process.env.PORT)
export const JWT_KEY = String(process.env.JWT_KEY)
export const BCRYPT_SALT = Number(process.env.BCRYPT_SALT)
