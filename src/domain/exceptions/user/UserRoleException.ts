export default class UserRoleException extends Error {
  constructor () {
    super('The action is not allowed due the user role')
  }
}
