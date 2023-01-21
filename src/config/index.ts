import * as dotenv from 'dotenv'
dotenv.config()

export const DATABASE = process.env.DATABASE ?? ''
export const PORT = process.env.PORT ?? ''
