import { Schema, model } from 'mongoose'
import { Card } from '../../../../domain/entities/Card'

const { ObjectId } = Schema.Types

const CardSchema = new Schema<Card>(
  {
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    company: {
      type: ObjectId,
      ref: 'Company',
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 32
    },
    color: {
      type: String
    },
    logo: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
)

const CardModel = model<Card>('Card', CardSchema)

export default CardModel
