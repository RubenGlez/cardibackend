export default class CardNotFoundException extends Error {
  constructor () {
    super('Card not found')
  }
}
