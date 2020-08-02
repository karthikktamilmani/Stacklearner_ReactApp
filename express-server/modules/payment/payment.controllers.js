/**
 * API Store - Contains the backend services
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

/* Import code dependencies. In this case, these are
learning path module's data models. */
const {
	Cards,
	SubscriptionStatus,
	CouponCode,
	PaymentHistory
} = require("../../models/payment.models");

// PROJECT RESOURCE CONTROLLERS
const subscriptionPlans = {
	Monthly: 1,
	Quarterly: 3,
	Yearly: 12
}

const getAllCards = (req, res) => {
	const userID = req.query.userID;
	const query = Cards.find({
			studentID: userID
		},
		"nameOnCard cardNumber cardExpiry"
	);

	query.exec((err, cards) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else if (!cards) {
			res.status(404).json({
				status: "error",
				message: "No cards found for user."
			});
		} else {
			res.status(200).json({
				status: "success",
				cards: cards
			});
		}
	});
};

const addNewCard = (req, res) => {
	const cards = new Cards(req.body);

	cards
		.save()
		.then(() => {
			res.status(200).send({
				status: "success",
				key: cards._id
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				status: "error",
				message: `Following error was encountered: ${err}`,
			});
		});
};

const deleteCard = (req, res) => {
	const deleteCardQuery = Cards.findByIdAndRemove(req.query.cardID, {
		useFindAndModify: false,
	});

	deleteCardQuery.exec((err) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else {
			res.status(200).json({
				message: "Card deleted."
			});
		}
	});
};

const getSubscriptionStatus = (req, res) => {
	const userID = req.query.userID;
	const query = SubscriptionStatus.findOne({
		studentID: userID
	});

	query.exec((err, subscriptionStatus) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else {
			let isPaid = false;
			let validity = 0;
			if (subscriptionStatus && subscriptionStatus.isPaid) {
				const validityDate = subscriptionStatus.subscriptionValidity;
				const todaysDate = new Date();
				if (validityDate > todaysDate) {
					isPaid = true;
					validity = validityDate;
				} else {
					updateSubscriptionStatus(userID, false, null);
				}
			}
			res.status(200).json({
				isPaid: isPaid,
				validity: validity
			});
		}
	});
};

const getCouponCodeValue = (req, res) => {
	const couponCode = req.query.couponCode;
	const query = CouponCode.findOne({
		couponCode: couponCode
	});

	query.exec((err, couponCode) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else {
			let isValid = false;
			let value = 0;
			if (couponCode) {
				const validityDate = couponCode.validity;
				const todaysDate = new Date();
				if (validityDate > todaysDate) {
					isValid = true;
					value = couponCode.value;
				}
			}
			res.status(200).json({
				isValid: isValid,
				value: value
			});
		}
	});
};

const fetchSubscriptionValidity = async (userId) => {
	try {
		const query = SubscriptionStatus.findOne({
			studentID: userId
		});

		const subscriptionStatus = await query.exec();
		if (subscriptionStatus) {
			return subscriptionStatus.subscriptionValidity;
		}
	} catch (error) {
		console.log(error);
	}
	return;
}

const makePayment = (req, res) => {
	const cardID = req.body.card_selection;
	const query = Cards.findById(cardID);

	query.exec(async (err, cards) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else if (!cards) {
			res.status(404).json({
				message: "No cards found for user."
			});
		} else {
			delete cards._doc._id;
			var requestObj = {
				...req.body,
				...cards._doc
			};
			requestObj["paymentDate"] = new Date();
			const numberOfMonths = subscriptionPlans[requestObj["plan"]];
			let currentDate = await fetchSubscriptionValidity(requestObj["studentID"]) || new Date();
			const newDate = currentDate.setMonth(currentDate.getMonth() + numberOfMonths);
			const subscriptionStatusQuery = await updateSubscriptionStatus(requestObj["studentID"], true, newDate);
			if (subscriptionStatusQuery) {
				const paymentHistoryQuery = await addPaymentHistory(requestObj);

				if (paymentHistoryQuery) {
					res.status(200).json({
						status: "success"
					});
				} else {
					res.status(200).json({
						status: "error"
					});
				}
			}
		}
	});
};

const getPaymentHistory = (req, res) => {

	const userID = req.query.userID;
	const query = PaymentHistory.find({studentID: userID});

	query.exec((err, paymentHistory) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});

		} else if (paymentHistory) {
			const response = [];
			paymentHistory.forEach((eachPayment) => {
				let eachPaymentObj = {};
				const requestedItems = ["total", "price", "plan", "cardNumber", "paymentDate"]
				requestedItems.map((key) => {
					eachPaymentObj[key] = eachPayment[key];
				});
				response.push(eachPaymentObj);
			});
			console.log(response);
			res.status(200).json({response});

		}
	})
}

const addPaymentHistory = async (requestBody) => {
	try {
		const paymentHistory = new PaymentHistory(requestBody);

		const result = await paymentHistory.save();
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}

};

const updateSubscriptionStatus = async (userID, subscriptionStatus, validityDate) => {
	const filter = {
		studentID: userID
	};
	const update = {
		isPaid: subscriptionStatus,
		subscriptionValidity: validityDate,
	};

	const query = SubscriptionStatus.findOneAndUpdate(filter, update, {
		new: true,
		upsert: true,
		useFindAndModify: false
	});

	// Execute query
	try {
		const result = await query.exec();
		if (result) {
			return true;
		}
	} catch (error) {
	}
	return false;
};

// Export controllers through object export pattern
module.exports = {
	addNewCard,
	getAllCards,
	deleteCard,
	getSubscriptionStatus,
	getCouponCodeValue,
	makePayment,
	getPaymentHistory
};
