import * as http from 'http'
import { DATABASE, PORT } from './config'
import MongooseAdapter from './infrastructure/driven-adapters/mongoose'
import Server from './infrastructure/driving-adapters/api-rest/server'

const ServerInstance = new Server(PORT)
const MongoInstance = new MongooseAdapter(DATABASE)

const runServer = async (): Promise<http.Server | undefined> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
  return ServerInstance.getServerInstance()
}

const app = runServer()

export default app
