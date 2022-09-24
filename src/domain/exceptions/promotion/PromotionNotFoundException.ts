export default class PromotionNotFoundException extends Error {
  constructor () {
    super('Promotion not found')
  }
}
