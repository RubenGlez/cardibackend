import mongoose, { Connection, connection } from 'mongoose'

export default class MongooseAdapter {
  private _db: Connection | null = null
  private readonly _uri: string

  constructor(uri: string) {
    this._uri = uri
  }

  public async connect(): Promise<void> {
    if (this._db !== null) return
    mongoose.set('strictQuery', false)
    await mongoose.connect(this._uri)
    this._db = connection
    console.log('🔌 Database connected')
  }

  public async disconnect(): Promise<void> {
    if (this._db === null) return
    await mongoose.disconnect()
    this._db = null
  }
}
