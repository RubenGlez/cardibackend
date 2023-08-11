import { PORT, DATABASE } from "./config"
import MongooseAdapter from "./infrastructure/driven-adapters/mongoose"
import Server from "./infrastructure/driving-adapters/api-rest/server"

const serverInstance = new Server(PORT)
export const mongoInstance = new MongooseAdapter(DATABASE)
const appInstance = serverInstance.getAppInstance()

export default appInstance
