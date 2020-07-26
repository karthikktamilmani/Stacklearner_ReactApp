/**
 * Payment History Component
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

import React, {Component} from "react";
import { fetchPaymentHistory } from "../../../store";

export default class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    //
    this.state = {
      history: [],
    };

    this.fetchPaymentDetails();
  }

  fetchPaymentDetails = () => {
    fetchPaymentHistory().then((result) => {
      result = result.map(
        item => {
          let payment ={};
          payment.card =
          (item.cardNumber.toString().substring(0, 3) +
          "**********" +
          item.cardNumber.toString().substr(14));
          payment.date = new Date(Date.parse(item.paymentDate)).toDateString();
          payment.plan = item.plan;
          payment.amount = item.price;
          payment.paid = item.total;
          return payment;
        }
      );
      this.setState({
        history: result,
      });
    });
  }

  render() {
    return (
      <div className="d-flex">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Card</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.history.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.card}</td>
                <td>{item.plan}</td>
                <td>{item.amount}</td>
                <td>{item.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
