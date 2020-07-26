/**
 * API Store - Contains method calls to backend
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

import axios from "./authentication/axios-user-management";
import auth from "./authentication/Auth";

export async function fetchCardDetails() {
  try {
    const userID = auth.user._id;
    const result = await axios.get(`/payment/cards?userID=${userID}`);

    result.data.cards.map(
      item =>
        (item.cardNumber =
          item.cardNumber.toString().substring(0, 3) +
          "**********" +
          item.cardNumber.toString().substr(14))
    );
    return result.data.cards || [];
  } catch (error) {}
}

export async function addCardDetails(cardDetails) {
  try {
    cardDetails.studentID = auth.user._id;
    const result = await axios.post("/payment/cards", cardDetails);
    return result.data;
  } catch (error) {}
}

export async function subscribe(dataObject) {
  try {
    dataObject.studentID = auth.user._id;
    const res = await axios.post("/payment/subscribe", dataObject);
    return res.data;
  } catch (error) {}
}

export async function getSubscriptionStatus() {
  try {
    const userID = auth.user._id;
    const res = await axios.get(`/payment/subscriptionStatus?userID=${userID}`);
    return res.data;
  } catch (error) {}
}

export async function fetchPaymentHistory() {
  try {
    const userID = auth.user._id;
    const res = await axios.get(`/payment/paymentHistory?userID=${userID}`);
    return res.data.response || [];
  } catch (error) {}
}
