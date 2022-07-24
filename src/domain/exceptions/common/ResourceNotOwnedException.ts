export default class ResourceNotOwnedException extends Error {
  constructor () {
    super('Action not authorized for this resource')
  }
}
