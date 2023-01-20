import { Promotion } from './Promotion'

export interface Metrics {
  unexpired: {
    mostFollowedPromotions: Promotion[]
    mostCompletedPromotions: Promotion[]
  }
  expired: {
    mostFollowedPromotions: Promotion[]
    mostCompletedPromotions: Promotion[]
  }
}
