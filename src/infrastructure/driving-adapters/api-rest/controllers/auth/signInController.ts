import { NextFunction, Request, Response } from 'express'
import {
  MongoUserRepository,
  MongoAuthRepository
} from '../../../../../infrastructure'
import { SignInUseCase } from '../../../../../application'

export default async function signInController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const signInUseCase = new SignInUseCase(mongoAuthRepository, mongoUserRepository)

  try {
    const authData = await signInUseCase.run(req.body)
    res.json(authData)
  } catch (e) {
    next(e)
  }
}
