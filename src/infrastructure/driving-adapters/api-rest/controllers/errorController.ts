import { Request, NextFunction, Response } from 'express'

export default function errorController (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Express error: ', err)
  res.status(500)
  res.json({
    error: err
  })
}
