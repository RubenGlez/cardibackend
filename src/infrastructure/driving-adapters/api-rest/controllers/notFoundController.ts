import { Request, Response, NextFunction } from 'express'
import { CardiError } from '../../../../domain/exceptions/CardiError'
import { CardiErrorTypes } from '../../../../domain/exceptions/CardiErrorTypes'

export default function notFoundController(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = new CardiError(CardiErrorTypes.NotFound)
  next(error)
}
