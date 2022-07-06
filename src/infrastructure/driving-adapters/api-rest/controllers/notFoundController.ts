import { Request, Response, NextFunction } from 'express'

export default function notFoundController (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = new Error('404. Not found')
  next(error)
}
