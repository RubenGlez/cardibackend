"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardiErrors = void 0;
const CardiErrorTypes_1 = require("./CardiErrorTypes");
exports.cardiErrors = {
    [CardiErrorTypes_1.CardiErrorTypes.InvalidAccessToken]: {
        name: CardiErrorTypes_1.CardiErrorTypes.InvalidAccessToken,
        message: 'Invalid API key',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.InvalidCredentials]: {
        name: CardiErrorTypes_1.CardiErrorTypes.InvalidCredentials,
        message: 'Invalid credentials',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.MissingAccessToken]: {
        name: CardiErrorTypes_1.CardiErrorTypes.MissingAccessToken,
        message: 'Missing access token',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.CardNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.CardNotFound,
        message: 'Card not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.CompanyAlreadyExist]: {
        name: CardiErrorTypes_1.CardiErrorTypes.CompanyAlreadyExist,
        message: 'Company already exist',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.CompanyNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.CompanyNotFound,
        message: 'Company not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.CompanyAlreadyExist]: {
        name: CardiErrorTypes_1.CardiErrorTypes.CompanyAlreadyExist,
        message: 'Company already exist',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.PreferencesAlreadyExist]: {
        name: CardiErrorTypes_1.CardiErrorTypes.PreferencesAlreadyExist,
        message: 'Preferences already exist',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.PreferencesNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.PreferencesNotFound,
        message: 'Preferences not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.PromotionNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.PromotionNotFound,
        message: 'Promotion not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.UserAlreadyExist]: {
        name: CardiErrorTypes_1.CardiErrorTypes.UserAlreadyExist,
        message: 'User already exist',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.UserNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.UserNotFound,
        message: 'User not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.InvalidUserRole]: {
        name: CardiErrorTypes_1.CardiErrorTypes.InvalidUserRole,
        message: 'Invalid user role',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.PromotionOutdated]: {
        name: CardiErrorTypes_1.CardiErrorTypes.PromotionOutdated,
        message: 'Promotion outdated',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.NotOwned]: {
        name: CardiErrorTypes_1.CardiErrorTypes.NotOwned,
        message: 'Resource not owned',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.Unknown]: {
        name: CardiErrorTypes_1.CardiErrorTypes.Unknown,
        message: 'Unknown error',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.ExpiredAccessToken]: {
        name: CardiErrorTypes_1.CardiErrorTypes.ExpiredAccessToken,
        message: 'Expired access token',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.SubscriptionAlreadyExist]: {
        name: CardiErrorTypes_1.CardiErrorTypes.SubscriptionAlreadyExist,
        message: 'Subscription already exists',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.InvalidPromotionType]: {
        name: CardiErrorTypes_1.CardiErrorTypes.InvalidPromotionType,
        message: 'Invalid promotion type',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.SubscriptionAlreadyCompleted]: {
        name: CardiErrorTypes_1.CardiErrorTypes.SubscriptionAlreadyCompleted,
        message: 'Subscription already completed',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.SubscriptionNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.SubscriptionNotFound,
        message: 'Subscription not found',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.InvalidSusbcriptorRole]: {
        name: CardiErrorTypes_1.CardiErrorTypes.InvalidSusbcriptorRole,
        message: 'Invalid susbcriptor role',
        status: 500,
    },
    [CardiErrorTypes_1.CardiErrorTypes.WalletNotFound]: {
        name: CardiErrorTypes_1.CardiErrorTypes.WalletNotFound,
        message: 'Wallet not found',
        status: 500,
    },
};
