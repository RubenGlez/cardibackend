export default class ForbiddenException extends Error {
  constructor () {
    super('Action not authorized for this resource')
  }
}
