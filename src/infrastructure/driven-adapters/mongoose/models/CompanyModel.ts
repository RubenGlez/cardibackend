import { Schema, model } from 'mongoose'
import { Company } from '../../../../domain'

const { ObjectId } = Schema.Types

const CompanySchema = new Schema<Company>(
    {
        owner: {
            type: ObjectId,
            ref: 'User',
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
            maxLength: 320
        },
        contact: {
            phone: {
                type: String,
                minLength: 9,
                maxLength: 18
            },
            email: {
                type: String,
                lowercase: true,
                match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
            },
            web: {
                type: String,
                minLength: 4,
                maxLength: 320
            }
        }
    },
    { timestamps: true }
)

const CompanyModel = model<Company>('Company', CompanySchema)

export default CompanyModel
