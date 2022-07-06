import { NextFunction, Request, Response } from 'express'
import { MongoUserRepository } from '../../../../../infrastructure'
import { GetUserUseCase } from '../../../../../application'

export default async function getUserController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const getUserUseCase = new GetUserUseCase(mongoUserRepository)

  try {
    const { userId } = req.params
    const users = await getUserUseCase.run(userId)
    res.json(users)
  } catch (e) {
    next(e)
  }
}
