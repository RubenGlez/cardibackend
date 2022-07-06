export default class MissingAccessTokenException extends Error {
  constructor () {
    super('Missing access token')
  }
}
