/**
 * API Store - Contains backend routers
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

// Import core dependencies
const express = require('express');
const authTokenServices = require('../authentication/authtoken.service');

// Import controllers
const {
    getAllCards,
    addNewCard,
    deleteCard,
    getSubscriptionStatus,
    getCouponCodeValue,
    makePayment,
    getPaymentHistory
} = require('./payment.controllers');

// Revealing module pattern
const router = () => {
    const paymentRouter = express.Router();
    const authTokenService = authTokenServices();

    paymentRouter.route('/cards').get(authTokenService.validateToken, getAllCards);

    paymentRouter.route('/cards').post(authTokenService.validateToken, addNewCard);

    paymentRouter.route('/cards').delete(authTokenService.validateToken, deleteCard);

    paymentRouter.route('/subscriptionStatus').get(authTokenService.validateToken, getSubscriptionStatus);

    paymentRouter.route('/couponCode').get(authTokenService.validateToken, getCouponCodeValue);

    paymentRouter.route('/subscribe').post(authTokenService.validateToken, makePayment);

    paymentRouter.route('/paymentHistory').get(authTokenService.validateToken, getPaymentHistory);

    return paymentRouter;
}


module.exports = router;