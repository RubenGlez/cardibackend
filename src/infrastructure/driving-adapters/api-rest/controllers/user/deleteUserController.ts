import { NextFunction, Request, Response } from 'express'
import DeleteUserUseCase from '../../../../../application/use-cases/user/DeleteUserUseCase'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'


export default async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(mongoUserRepository)

  try {
    const { params, tenantId } = req
    const { userId } = params
    const deletedUser = await deleteUserUseCase.run(userId, tenantId)
    res.json(deletedUser)
  } catch (e) {
    next(e)
  }
}
