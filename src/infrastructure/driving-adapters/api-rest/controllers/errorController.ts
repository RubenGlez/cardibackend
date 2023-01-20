import { Request, NextFunction, Response } from 'express'
import { OutputError } from '../../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../../domain/exceptions/OutputErrorTypes'

export default function errorController(
  err: Error | OutputError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof OutputError) {
    res.status(err.status).send(err)
  } else {
    console.error('🚨 Error not handled: ', err)

    const outputError = new OutputError(OutputErrorTypes.Unknown)
    res.status(outputError.status).send(outputError)
  }
}
