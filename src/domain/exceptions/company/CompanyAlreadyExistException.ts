export default class CompanyAlreadyExistException extends Error {
  constructor () {
    super('Company already exist')
  }
}
