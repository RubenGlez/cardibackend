export default class InvalidAccessTokenException extends Error {
  constructor () {
    super('Invalid access token')
  }
}
