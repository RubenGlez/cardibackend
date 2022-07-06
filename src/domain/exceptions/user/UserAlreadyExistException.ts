export default class UserAlreadyExistException extends Error {
  constructor () {
    super('User already exist')
  }
}
