import * as http from 'http'
import { DATABASE, PORT } from './config'
import MongooseAdapter from './infrastructure/driven-adapters/mongoose'
import Server from './infrastructure/driving-adapters/api-rest/server'

const ServerInstance = new Server(PORT)
const MongoInstance = new MongooseAdapter(DATABASE)
let appInstance

const runApiRest = async (): Promise<http.Server | undefined> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
  return ServerInstance.getAppInstance()
}

const app = (() => {
  if (appInstance !== null) {
    return appInstance
  } else {
    appInstance = runApiRest()
    return appInstance
  }
})()

export default app
