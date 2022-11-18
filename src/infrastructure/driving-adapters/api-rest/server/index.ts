import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import * as http from 'http'
import routes from '../routes'

export default class Server {
  private readonly _port: number
  private readonly _app: express.Express
  private _httpServer?: http.Server

  constructor(port: number) {
    this._port = port
    this._app = express()
    this._app.set('port', port)
    this.setMiddlewares()
    this.setRoutes()
  }

  private setMiddlewares(): void {
    this._app.use(cors())
    this._app.use(helmet())
    this._app.use(morgan('dev'))
    this._app.use(express.json())
  }

  private setRoutes(): void {
    this._app.use('/api', routes)
  }

  async listen(): Promise<void> {
    return await new Promise((resolve) => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log('Server listening on port', this._port)
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer !== undefined) {
        this._httpServer.close((error) => {
          if (error !== null) {
            return reject(error)
          }
          return resolve()
        })
      }
      return resolve()
    })
  }
}
