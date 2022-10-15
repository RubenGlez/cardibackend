import { CardiError } from "./CardiError"
import { CardiErrorTypes } from "./CardiErrorTypes"


type CardiErrors = Record<CardiErrorTypes, Pick<CardiError, 'name' | 'message' | 'status'>>

export const cardiErrors: CardiErrors = {
  [CardiErrorTypes.InvalidAccessToken]: {
    name: CardiErrorTypes.InvalidAccessToken,
    message: 'Invalid API key',
    status: 500,
  },
  [CardiErrorTypes.InvalidCredentials]: {
    name: CardiErrorTypes.InvalidCredentials,
    message: 'Invalid credentials',
    status: 500,
  },
  [CardiErrorTypes.MissingAccessToken]: {
    name: CardiErrorTypes.MissingAccessToken,
    message: 'Missing access token',
    status: 500,
  },
  [CardiErrorTypes.CardNotFound]: {
    name: CardiErrorTypes.CardNotFound,
    message: 'Card not found',
    status: 500,
  },
  [CardiErrorTypes.CompanyAlreadyExist]: {
    name: CardiErrorTypes.CompanyAlreadyExist,
    message: 'Company already exist',
    status: 500,
  },
  [CardiErrorTypes.CompanyNotFound]: {
    name: CardiErrorTypes.CompanyNotFound,
    message: 'Company not found',
    status: 500,
  },
  [CardiErrorTypes.CompanyAlreadyExist]: {
    name: CardiErrorTypes.CompanyAlreadyExist,
    message: 'Company already exist',
    status: 500,
  },
  [CardiErrorTypes.PreferencesAlreadyExist]: {
    name: CardiErrorTypes.PreferencesAlreadyExist,
    message: 'Preferences already exist',
    status: 500,
  },
  [CardiErrorTypes.PreferencesNotFound]: {
    name: CardiErrorTypes.PreferencesNotFound,
    message: 'Preferences not found',
    status: 500,
  },
  [CardiErrorTypes.PromotionNotFound]: {
    name: CardiErrorTypes.PromotionNotFound,
    message: 'Promotion not found',
    status: 500,
  },
  [CardiErrorTypes.UserAlreadyExist]: {
    name: CardiErrorTypes.UserAlreadyExist,
    message: 'User already exist',
    status: 500,
  },
  [CardiErrorTypes.UserNotFound]: {
    name: CardiErrorTypes.UserNotFound,
    message: 'User not found',
    status: 500,
  },
  [CardiErrorTypes.InvalidUserRole]: {
    name: CardiErrorTypes.InvalidUserRole,
    message: 'Invalid user role',
    status: 500,
  },
  [CardiErrorTypes.PromotionOutdated]: {
    name: CardiErrorTypes.PromotionOutdated,
    message: 'Promotion outdated',
    status: 500,
  },
  [CardiErrorTypes.NotOwned]: {
    name: CardiErrorTypes.NotOwned,
    message: 'Resource not owned',
    status: 500,
  },
  [CardiErrorTypes.Unknown]: {
    name: CardiErrorTypes.Unknown,
    message: 'Unknown error',
    status: 500,
  },
  [CardiErrorTypes.ExpiredAccessToken]: {
    name: CardiErrorTypes.ExpiredAccessToken,
    message: 'Expired access token',
    status: 500,
  },
  [CardiErrorTypes.SubscriptionAlreadyExist]: {
    name: CardiErrorTypes.SubscriptionAlreadyExist,
    message: 'Subscription already exists',
    status: 500,
  },
  [CardiErrorTypes.InvalidPromotionType]: {
    name: CardiErrorTypes.InvalidPromotionType,
    message: 'Invalid promotion type',
    status: 500,
  },
  [CardiErrorTypes.SubscriptionAlreadyCompleted]: {
    name: CardiErrorTypes.SubscriptionAlreadyCompleted,
    message: 'Subscription already completed',
    status: 500,
  },
  [CardiErrorTypes.SubscriptionNotFound]: {
    name: CardiErrorTypes.SubscriptionNotFound,
    message: 'Subscription not found',
    status: 500,
  },
}
