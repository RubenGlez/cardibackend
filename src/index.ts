import { DATABASE, PORT } from './config'
import MongooseAdapter from './infrastructure/driven-adapters/mongoose'
import Server from './infrastructure/driving-adapters/api-rest/server'

const ServerInstance = new Server(PORT)
const MongoInstance = new MongooseAdapter(DATABASE)

const runApiRest = async (): Promise<void> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
}

void runApiRest()

// testing CI
