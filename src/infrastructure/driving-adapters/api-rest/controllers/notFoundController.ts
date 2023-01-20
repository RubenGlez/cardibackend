import { Request, Response, NextFunction } from 'express'
import { OutputError } from '../../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../../domain/exceptions/OutputErrorTypes'

export default function notFoundController(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = new OutputError(OutputErrorTypes.NotFound)
  next(error)
}
