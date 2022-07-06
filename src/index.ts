import { MongoDB, Server } from './infrastructure'

const port = 8000
const dbUri = 'mongodb://127.0.0.1:27017/daren-back-db'

const ServerInstance = new Server(port)
const MongoInstance = new MongoDB(dbUri)

const runApiRest = async (): Promise<void> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
}

runApiRest()
