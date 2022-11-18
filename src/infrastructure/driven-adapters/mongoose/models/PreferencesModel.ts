import { Schema, model } from 'mongoose'
import { Preferences } from '../../../../domain/entities/Preferences'

const { ObjectId, String } = Schema.Types

const PreferencesSchema = new Schema<Preferences>(
    {
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        companySelected: {
            type: ObjectId,
            ref: 'Company',
        },
        themeSelected: {
            type: String,
        }
    },
    { timestamps: true }
)

const PreferencesModel = model<Preferences>('Preferences', PreferencesSchema)

export default PreferencesModel
