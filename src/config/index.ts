import * as dotenv from 'dotenv'
dotenv.config()

export const DATABASE = process.env.DATABASE ?? ''
export const PORT = process.env.PORT ?? ''
export const JWT_KEY = process.env.JWT_KEY ?? ''
export const BCRYPT_SALT = process.env.BCRYPT_SALT ?? ''
