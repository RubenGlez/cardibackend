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
    const { params, tenantId } = req
    const { userId } = params
    const user = await updateUserUseCase.run({
      tenantId,
      ...req.body,
      id: userId
    })
    res.json(user)
  } catch (e) {
    next(e)
  }
}
