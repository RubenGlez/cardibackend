import { NextFunction, Request, Response } from 'express'
import UpdateUserUseCase from '../../../../../application/use-cases/user/UpdateUserUseCase'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'


export default async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(mongoUserRepository)

  try {
    const { params, tenantId } = req
    const { userId } = params
    const user = await updateUserUseCase.run({ ...req.body, id: userId }, tenantId)
    res.json(user)
  } catch (e) {
    next(e)
  }
}
