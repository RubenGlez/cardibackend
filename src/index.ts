import MongooseAdapter from "./infrastructure/driven-adapters/mongoose"
import Server from "./infrastructure/driving-adapters/api-rest/server"

const port = 3000
const dbUri = 'mongodb://127.0.0.1:27017/daren-back-db'

const ServerInstance = new Server(port)
const MongoInstance = new MongooseAdapter(dbUri)

const runApiRest = async (): Promise<void> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
}

void runApiRest()
