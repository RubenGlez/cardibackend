import { Schema, model } from 'mongoose'
import { Promotion, PromotionType } from '../../../../domain'

const { ObjectId } = Schema.Types

const PromotionSchema = new Schema<Promotion>(
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
        card: {
            type: ObjectId,
            ref: 'Card',
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 2,
            maxLength: 32
        },
        description: {
            type: String,
            minLength: 2,
            maxLength: 320,
            required: true
        },
        type: {
            type: String,
            enum: Object.values(PromotionType),
            required: true
        },
        validFrom: {
            type: Date,
            required: true
        },
        validTo: {
            type: Date,
            required: true
        },
    },
    { timestamps: true }
)

const PromotionModel = model<Promotion>('Promotion', PromotionSchema)

export default PromotionModel
