import { Schema, model } from 'mongoose'
import { Subscription, SubscriptionStatus } from '../../../../domain'

const { ObjectId } = Schema.Types

const SubscriptionSchema = new Schema<Subscription>(
  {
    subscriptor: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    promotion: {
      type: ObjectId,
      ref: 'Promotion',
      required: true
    },
    card: {
      type: ObjectId,
      ref: 'Card',
      required: true
    },
    company: {
      type: ObjectId,
      ref: 'Company',
      required: true
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: true
    },
    steps: {
      type: [{
        id: String,
        date: Date
      }],
      required: true
    },
  },
  { timestamps: true }
)

const SubscriptionModel = model<Subscription>('Subscription', SubscriptionSchema)

export default SubscriptionModel
