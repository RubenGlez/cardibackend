import { NextFunction, Request, Response } from 'express'
import { MongoUserRepository } from '../../../../../infrastructure'
import { UpdateUserUseCase } from '../../../../../application'

export default async function updateUserController (
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
