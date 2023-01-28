import express from 'express'
import { DATABASE, PORT } from './config'
import MongooseAdapter from './infrastructure/driven-adapters/mongoose'
import Server from './infrastructure/driving-adapters/api-rest/server'

const ServerInstance = new Server(PORT)
const MongoInstance = new MongooseAdapter(DATABASE)

const runApiRest = async (): Promise<express.Express> => {
  await ServerInstance.listen()
  await MongoInstance.connect()
  const appInstance = ServerInstance.getAppInstance()
  return appInstance
}

const apiInstance = runApiRest()

// force push 1

module.exports = apiInstance
