import { Schema, model } from 'mongoose'
import { User, UserRole } from '../../../../domain/entities/User'

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Invalid email format'
      ]
    },
    password: {
      type: String,
      required: true,
      minLength: 4
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 32
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true
    },
    lastLoginAt: Date
  },
  {
    timestamps: true
  }
)

const UserModel = model<User>('User', UserSchema)

export default UserModel
