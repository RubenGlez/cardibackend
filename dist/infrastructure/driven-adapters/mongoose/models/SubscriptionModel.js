"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Subscription_1 = require("../../../../domain/entities/Subscription");
const { ObjectId } = mongoose_1.Schema.Types;
const SubscriptionSchema = new mongoose_1.Schema({
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
        enum: Object.values(Subscription_1.SubscriptionStatus),
        default: Subscription_1.SubscriptionStatus.inProgress,
        required: true
    },
    steps: {
        type: [
            {
                date: Date
            }
        ],
        required: true
    }
}, { timestamps: true });
const SubscriptionModel = (0, mongoose_1.model)('Subscription', SubscriptionSchema);
exports.default = SubscriptionModel;
