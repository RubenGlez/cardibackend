import { outputErrors } from './outputErrors'
import { OutputErrorTypes } from './OutputErrorTypes'

export class OutputError extends Error {
  public readonly _type = 'OutputError'
  public readonly name: OutputErrorTypes
  public readonly message: string
  public readonly status: number
  public readonly info?: Record<string, string> = {}

  constructor(name: OutputErrorTypes, info?: Record<string, string>) {
    super()

    this.name = name
    this.message = outputErrors[name].message
    this.status = outputErrors[name].status
    this.info = info
  }
}
