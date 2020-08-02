/**
 * API Store - Contains the payment database models
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

// Import core dependencies
const mongoose = require("mongoose");
const {
	Schema
} = mongoose;

// Define schema for Project resource
const CardsSchema = Schema({
	studentID: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
		required: true
	},
	nameOnCard: {
		type: String,
		required: true
	},
	cardNumber: {
		type: Number,
		required: true,
		size: 16
	},
	cardExpiry: {
		type: String,
		required: true
	},
	cardCVV: {
		type: Number,
		required: true
	},
});

const SubscriptionSchema = Schema({
	studentID: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
		required: true,
		unique: true
	},
	isPaid: {
		type: Boolean,
		required: true
	},
	subscriptionValidity: {
		type: Date
	}
});

const CouponSchema = Schema({
	couponCode: {
		type: String,
		required: true,
		unique: true
	},
	value: {
		type: Number,
		required: true
	},
	validity: {
		type: Date,
		required: true
	}
});

const PaymentHistorySchema = Schema({
	studentID: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	address2: {
		type: String
	},
	country: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	plan: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	promoCode: {
		type: String
	},
	promoCodeValue: {
		type: Number
	},
	nameOnCard: {
		type: String,
		required: true
	},
	cardNumber: {
		type: Number,
		required: true,
		size: 16
	},
	cardExpiry: {
		type: String,
		required: true
	},
	paymentDate: {
		type: Date
	}
});

// Attach schemas to respective collections
const Cards = mongoose.model("Cards", CardsSchema, "cards");
const SubscriptionStatus = mongoose.model("SubscriptionStatus", SubscriptionSchema, "subscriptionStatus");
const CouponCode = mongoose.model("CouponCode", CouponSchema, "couponCode");
const PaymentHistory = mongoose.model("PaymentHistory", PaymentHistorySchema, "paymentHistory");

// Export models through object export pattern
module.exports = {
	Cards,
	SubscriptionStatus,
	CouponCode,
	PaymentHistory
};
