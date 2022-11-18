import { OutputError } from "./OutputError"
import { OutputErrorTypes } from "./OutputErrorTypes"


type OutputErrors = Record<OutputErrorTypes, Pick<OutputError, 'name' | 'message' | 'status'>>

export const outputErrors: OutputErrors = {
  [OutputErrorTypes.InvalidAccessToken]: {
    name: OutputErrorTypes.InvalidAccessToken,
    message: 'Invalid API key',
    status: 500,
  },
  [OutputErrorTypes.InvalidCredentials]: {
    name: OutputErrorTypes.InvalidCredentials,
    message: 'Invalid credentials',
    status: 500,
  },
  [OutputErrorTypes.MissingAccessToken]: {
    name: OutputErrorTypes.MissingAccessToken,
    message: 'Missing access token',
    status: 500,
  },
  [OutputErrorTypes.CardNotFound]: {
    name: OutputErrorTypes.CardNotFound,
    message: 'Card not found',
    status: 500,
  },
  [OutputErrorTypes.CompanyAlreadyExist]: {
    name: OutputErrorTypes.CompanyAlreadyExist,
    message: 'Company already exist',
    status: 500,
  },
  [OutputErrorTypes.CompanyNotFound]: {
    name: OutputErrorTypes.CompanyNotFound,
    message: 'Company not found',
    status: 500,
  },
  [OutputErrorTypes.CompanyAlreadyExist]: {
    name: OutputErrorTypes.CompanyAlreadyExist,
    message: 'Company already exist',
    status: 500,
  },
  [OutputErrorTypes.PreferencesAlreadyExist]: {
    name: OutputErrorTypes.PreferencesAlreadyExist,
    message: 'Preferences already exist',
    status: 500,
  },
  [OutputErrorTypes.PreferencesNotFound]: {
    name: OutputErrorTypes.PreferencesNotFound,
    message: 'Preferences not found',
    status: 500,
  },
  [OutputErrorTypes.PromotionNotFound]: {
    name: OutputErrorTypes.PromotionNotFound,
    message: 'Promotion not found',
    status: 500,
  },
  [OutputErrorTypes.UserAlreadyExist]: {
    name: OutputErrorTypes.UserAlreadyExist,
    message: 'User already exist',
    status: 500,
  },
  [OutputErrorTypes.UserNotFound]: {
    name: OutputErrorTypes.UserNotFound,
    message: 'User not found',
    status: 500,
  },
  [OutputErrorTypes.InvalidUserRole]: {
    name: OutputErrorTypes.InvalidUserRole,
    message: 'Invalid user role',
    status: 500,
  },
  [OutputErrorTypes.PromotionOutdated]: {
    name: OutputErrorTypes.PromotionOutdated,
    message: 'Promotion outdated',
    status: 500,
  },
  [OutputErrorTypes.NotOwned]: {
    name: OutputErrorTypes.NotOwned,
    message: 'Resource not owned',
    status: 500,
  },
  [OutputErrorTypes.Unknown]: {
    name: OutputErrorTypes.Unknown,
    message: 'Unknown error',
    status: 500,
  },
  [OutputErrorTypes.ExpiredAccessToken]: {
    name: OutputErrorTypes.ExpiredAccessToken,
    message: 'Expired access token',
    status: 500,
  },
  [OutputErrorTypes.SubscriptionAlreadyExist]: {
    name: OutputErrorTypes.SubscriptionAlreadyExist,
    message: 'Subscription already exists',
    status: 500,
  },
  [OutputErrorTypes.InvalidPromotionType]: {
    name: OutputErrorTypes.InvalidPromotionType,
    message: 'Invalid promotion type',
    status: 500,
  },
  [OutputErrorTypes.SubscriptionAlreadyCompleted]: {
    name: OutputErrorTypes.SubscriptionAlreadyCompleted,
    message: 'Subscription already completed',
    status: 500,
  },
  [OutputErrorTypes.SubscriptionNotFound]: {
    name: OutputErrorTypes.SubscriptionNotFound,
    message: 'Subscription not found',
    status: 500,
  },
  [OutputErrorTypes.InvalidSusbcriptorRole]: {
    name: OutputErrorTypes.InvalidSusbcriptorRole,
    message: 'Invalid susbcriptor role',
    status: 500,
  },
  [OutputErrorTypes.WalletNotFound]: {
    name: OutputErrorTypes.WalletNotFound,
    message: 'Wallet not found',
    status: 500,
  },
  [OutputErrorTypes.NotFound]: {
    name: OutputErrorTypes.NotFound,
    message: 'Route not found',
    status: 404,
  },
}
