"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputErrors = void 0;
const OutputErrorTypes_1 = require("./OutputErrorTypes");
exports.outputErrors = {
    [OutputErrorTypes_1.OutputErrorTypes.InvalidAccessToken]: {
        name: OutputErrorTypes_1.OutputErrorTypes.InvalidAccessToken,
        message: 'Invalid access token',
        status: 401,
    },
    [OutputErrorTypes_1.OutputErrorTypes.InvalidCredentials]: {
        name: OutputErrorTypes_1.OutputErrorTypes.InvalidCredentials,
        message: 'Invalid credentials',
        status: 401,
    },
    [OutputErrorTypes_1.OutputErrorTypes.MissingAccessToken]: {
        name: OutputErrorTypes_1.OutputErrorTypes.MissingAccessToken,
        message: 'Missing access token',
        status: 401,
    },
    [OutputErrorTypes_1.OutputErrorTypes.CardNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.CardNotFound,
        message: 'Card not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.CompanyAlreadyExist]: {
        name: OutputErrorTypes_1.OutputErrorTypes.CompanyAlreadyExist,
        message: 'Company already exist',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.CompanyNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.CompanyNotFound,
        message: 'Company not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.CompanyAlreadyExist]: {
        name: OutputErrorTypes_1.OutputErrorTypes.CompanyAlreadyExist,
        message: 'Company already exist',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.PreferencesAlreadyExist]: {
        name: OutputErrorTypes_1.OutputErrorTypes.PreferencesAlreadyExist,
        message: 'Preferences already exist',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.PreferencesNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.PreferencesNotFound,
        message: 'Preferences not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.PromotionNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.PromotionNotFound,
        message: 'Promotion not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.UserAlreadyExist]: {
        name: OutputErrorTypes_1.OutputErrorTypes.UserAlreadyExist,
        message: 'User already exist',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.UserNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.UserNotFound,
        message: 'User not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.InvalidUserRole]: {
        name: OutputErrorTypes_1.OutputErrorTypes.InvalidUserRole,
        message: 'Invalid user role',
        status: 403,
    },
    [OutputErrorTypes_1.OutputErrorTypes.PromotionOutdated]: {
        name: OutputErrorTypes_1.OutputErrorTypes.PromotionOutdated,
        message: 'Promotion outdated',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.NotOwned]: {
        name: OutputErrorTypes_1.OutputErrorTypes.NotOwned,
        message: 'Resource not owned',
        status: 403,
    },
    [OutputErrorTypes_1.OutputErrorTypes.Unknown]: {
        name: OutputErrorTypes_1.OutputErrorTypes.Unknown,
        message: 'Unknown error',
        status: 500,
    },
    [OutputErrorTypes_1.OutputErrorTypes.ExpiredAccessToken]: {
        name: OutputErrorTypes_1.OutputErrorTypes.ExpiredAccessToken,
        message: 'Expired access token',
        status: 401,
    },
    [OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyExist]: {
        name: OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyExist,
        message: 'Subscription already exists',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.InvalidPromotionType]: {
        name: OutputErrorTypes_1.OutputErrorTypes.InvalidPromotionType,
        message: 'Invalid promotion type',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyCompleted]: {
        name: OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyCompleted,
        message: 'Subscription already completed',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.SubscriptionNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.SubscriptionNotFound,
        message: 'Subscription not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.InvalidSusbcriptorRole]: {
        name: OutputErrorTypes_1.OutputErrorTypes.InvalidSusbcriptorRole,
        message: 'Invalid susbcriptor role',
        status: 405,
    },
    [OutputErrorTypes_1.OutputErrorTypes.WalletNotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.WalletNotFound,
        message: 'Wallet not found',
        status: 404,
    },
    [OutputErrorTypes_1.OutputErrorTypes.NotFound]: {
        name: OutputErrorTypes_1.OutputErrorTypes.NotFound,
        message: 'Route not found',
        status: 404,
    },
};
