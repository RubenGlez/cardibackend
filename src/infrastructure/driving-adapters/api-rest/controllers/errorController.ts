import { CardiError, CardiErrorTypes } from '../../../../domain'
import { Request, NextFunction, Response } from 'express'

export default function errorController (
  err: Error | CardiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof CardiError) {
    res.status(err.status).send(err)
  } else {
    console.error('--aqui error no controlado', err)

    const cardiError = new CardiError(CardiErrorTypes.Unknown)
    res.status(cardiError.status).send(cardiError)
  }
}
