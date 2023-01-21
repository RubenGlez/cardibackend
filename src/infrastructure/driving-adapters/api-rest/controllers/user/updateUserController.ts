import { NextFunction, Request, Response } from 'express'
import UpdateUserUseCase from '../../../../../application/use-cases/user/UpdateUserUseCase'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'

export default async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const updateUserUseCase = new UpdateUserUseCase({
    userRepository: mongoUserRepository
  })

  try {
    const { params, tenantId = '', body } = req
    const { userId } = params
    const user = await updateUserUseCase.run({
      tenantId,
      userId,
      ...body
    })
    res.json(user)
  } catch (e) {
    next(e)
  }
}
