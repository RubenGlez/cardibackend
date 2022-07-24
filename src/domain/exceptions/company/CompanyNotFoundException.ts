export default class CompanyNotFoundException extends Error {
  constructor () {
    super('Company not found')
  }
}
