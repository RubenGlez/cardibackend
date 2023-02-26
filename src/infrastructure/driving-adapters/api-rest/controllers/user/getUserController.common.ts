import { NextFunction, Request, Response } from 'express'
import GetUserUseCase from '../../../../../application/use-cases/user/GetUserUseCase.common'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'

export default async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const getUserUseCase = new GetUserUseCase({
    userRepository: mongoUserRepository
  })

  try {
    const { userId } = req.params
    const users = await getUserUseCase.run({ userId })
    res.json(users)
  } catch (e) {
    next(e)
  }
}
