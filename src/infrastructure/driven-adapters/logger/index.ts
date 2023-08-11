import winston from 'winston'

export class LoggerAdapter {
  instance: winston.Logger

  constructor() {
    this.instance = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    })

    if (process.env.NODE_ENV !== 'production') {
        this.instance.add(
        new winston.transports.Console({
          format: winston.format.simple()
        })
      )
    }
    return this
  }
}
