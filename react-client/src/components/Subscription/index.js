/**
 * App Subscription Component
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

import React, { Component } from "react";
import $ from "jquery";
import "./index.scss";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { fetchCardDetails, addCardDetails, subscribe, getSubscriptionStatus } from "../../store";
import axios from "../../authentication/axios-user-management";

export default class Subscription extends Component {
  constructor(props) {
    super(props);
    //
    this.isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    this.state = {
      plan: {
        plan: "Monthly",
        price: 10,
        total: 10,
      },
      cards: [],
      promoCode: {
        code: "",
        value: 0,
      },
      validity: ""
    };

    this.fetchCardInfo();
    this.fetchSubscriptionStatus();
  }

  fetchCardInfo = () => {
    fetchCardDetails().then((result) => {
      this.setState({
        cards: result,
      });
    });
  };

  fetchSubscriptionStatus = () => {
     getSubscriptionStatus().then((result) => {
       let date = "";

       if(result.validity !== "" && result.validity != null) {
         date = new Date(Date.parse(result.validity))
       }
      this.setState({
        isPaid: result.isPaid,
        validity: date.toDateString()
      });
    });
  }

  toggleAddNewCard = () => {
    let child = $("#newCard_Imp input");
    for (let i = 0; i < child.length; i++) {
      if (child[i].style.display !== "none") {
        child[i].required = true;
      }
    }
    child = $("#newCard_Misc input");
    for (let i = 0; i < child.length; i++) {
      if (child[i].style.display !== "none") {
        child[i].required = true;
      }
    }
    this.setState({ newCard: true });
  };

  disableAddNewCard = () => {
    let child = $("#newCard_Imp input");
    for (let i = 0; i < child.length; i++) {
      if (child[i].style.display !== "none") {
        child[i].required = false;
      }
    }

    child = $("#newCard_Misc input");
    for (let i = 0; i < child.length; i++) {
      if (child[i].style.display !== "none") {
        child[i].required = false;
      }
    }
    this.setState({ newCard: false });
  };

  checkoutDetails = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObject = {};
    for (var [key, value] of formData.entries()) {
      dataObject[key] = value;
    }
    if (this.state.newCard) {
      let {
        nameOnCard,
        cardNumber,
        cardExpiry,
        cardExpiry_text,
        cardCVV,
      } = event.target;
      const newCard = {
        nameOnCard: nameOnCard.value,
        cardNumber: cardNumber.value,
        cardExpiry:
          cardExpiry.value || (cardExpiry_text && cardExpiry_text.value),
        cardCVV: cardCVV.value,
      };
      addCardDetails(newCard).then(
        (result) => {
          dataObject["card_selection"] = result.key;
          this.sendPaymentRequest(dataObject);
        },
        (error) => {}
      );
    } else {
      this.sendPaymentRequest(dataObject);
    }
  };

  sendPaymentRequest = async (dataObject) => {
    const valuesNotNeeded = [
      "nameOnCard",
      "cardNumber",
      "cardExpiry",
      "cardExpiry_text",
      "cardCVV",
    ];
    Object.keys(dataObject)
      .filter((key) => valuesNotNeeded.includes(key))
      .forEach((key) => delete dataObject[key]);
    dataObject["promoCode"] = this.state.promoCode.code;
    dataObject["promoCodeValue"] = this.state.promoCode.value;
    Object.entries(this.state.plan).forEach(([key, value]) => {
      dataObject[key] = value;
    });

    try {
    const result =  await subscribe(dataObject);

    if( result["status"] === "error")
    {
      Swal.fire("Error","Payment failed! Please try after some time.","error");
    }
    else{
      Swal.fire("Success","Payment Successful","success").then((result)=> {
        window.location.reload();
      });

    }
    }
    catch(error)
    {
      Swal.fire("Error","Payment failed! Please try after some time.","error");
    }
  };

  cardSelected = (element, price, plan) => {
    //reset all elements selection
    document
      .getElementsByClassName("active-card")[0]
      .classList.remove("active-card");
    element.target.parentElement.classList.add("active-card");
    //
    const newPlan = { plan: plan, price: price, total: price };
    this.setState({
      plan: newPlan,
    });
    this.computeTotal(newPlan, this.state.promoCode);
  };

  computeTotal = (currentPlan, promoCode) => {
    this.setState({
      plan: {
        plan: currentPlan.plan,
        price: currentPlan.price,
        total: currentPlan.price - promoCode.value,
      },
    });
  };

  redeemCouponCode = (event) => {
    event.preventDefault();

    const { couponCode } = event.target;

    axios.get("/payment/couponCode?couponCode=" + couponCode.value).then(
      (res) => {
        const result = res.data;

        if (result.isValid) {
          const promoCode = { code: couponCode.value, value: result.value };
          this.setState({
            promoCode: promoCode,
          });
          this.computeTotal(this.state.plan, promoCode);
        } else {
          alert("Not valid or expired");
        }
      },
      (error) => {}
    );
  };

  render() {
    return (
      <div className="flex-column subscription-wrapper">
        <header>
          <nav className="navbar dark-navbar">
            <Link to="/" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
            <ul className="main-nav">
              <li><Link to="/student/dashboard" className="nav-links" aria-label="Go to your student\'s dashboard"><i className="fas fa-angle-left"></i>Back To Dashboard</Link></li>
            </ul>
          </nav>
        </header>
        <div
          className="d-flex justify-content-center mt-3"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            height: "fit-content",
          }}
          >
          <div className="main-content">
            <div className="card-group mb-5">
              <div
                className="card mr-2 active-card"
                style={{ minWidth: "18rem" }}
                >
                <a
                  className="card-block stretched-link text-decoration-none"
                  href="#"
                  onClick={(event) => {
                    this.cardSelected(event, 10, "Monthly");
                  }}
                  />
                <div className="card-body">
                  <h6 className="font-weight-normal">Monthly</h6>
                  <h2 className="text-center">
                    $10<span className="help-text">/Month</span>
                </h2>
                <ul className="list-unstyled mt-1 mb-4">
                  <li></li>
                </ul>
              </div>
            </div>

            <div className="card mr-2" style={{ minWidth: "18rem" }}>
              <a
                className="card-block stretched-link text-decoration-none"
                href="#"
                onClick={(event) => {
                  this.cardSelected(event, 50, "Quarterly");
                }}
                />
              <div className="card-body">
                <h6 className="font-weight-normal">Quarterly</h6>
                <h2 className="text-center">
                  $50<span className="help-text">/quarterly</span>
              </h2>
            </div>
          </div>

          <div className="card mr-2" style={{ minWidth: "18rem" }}>
            <a
              className="card-block stretched-link text-decoration-none"
              href="#"
              onClick={(event) => {
                this.cardSelected(event, 90, "Yearly");
              }}
              />
            <div className="card-body">
              <h6 className="font-weight-normal">Yearly</h6>
              <h2 className="text-center">
                $90<span className="help-text">/year</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="payment-banner"  style={!this.state.isPaid ? { display: "none" } : {}}>
        <i className="fa fa-exclamation icon"></i>
        Your current subscription epires on {this.state.validity}.
      </div>
      <div className="mt-3 d-flex flex-row">
        <div className="flex-column">
          <legend>Billing Address</legend>

          <form onSubmit={this.checkoutDetails}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  required
                  pattern="[a-zA-Z]*"
                  />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  pattern="[a-zA-Z]*"
                  required
                  />
              </div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="1333 South park st"
                required
                />
            </div>

            <div className="mb-3">
              <label>
                Address Line 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              name="address2"
              placeholder="Apartment or suite"
              />
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label>Country</label>
              <select
                className="custom-select d-block w-100"
                id="country"
                name="country"
                required
                >
                <option value="">Choose...</option>
                <option>Canada</option>
                <option>U.S.A</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>State</label>
              <select
                className="custom-select d-block w-100"
                id="state"
                name="state"
                required
                >
                <option value="">Choose...</option>
                <option>Nova Scotia</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Zip</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                required
                minLength="6"
                pattern="\w*"
                />
            </div>
          </div>

          <legend className="mb-3 mt-4">Payment</legend>
          <table className="table">
            <tbody>
              {this.state.cards.map((item, index) => (
                <tr key={index}>
                <th scope="row">
                  <input
                    type="radio"
                    name="card_selection"
                    onClick={this.disableAddNewCard}
                    checked={item.isSelected}
                    value={item._id}
                  />
                </th>
                <td>{item.nameOnCard}</td>
                <td>{item.cardNumber}</td>
                <td>{item.cardExpiry}</td>
              </tr>
              ))}
            </tbody>
          </table>

          <div className="row mt-3">
            <label className="col-md-6 mb-3 ml-2">
              {" "}
              <input
                type="radio"
                name="card_selection"
                required
                onClick={this.toggleAddNewCard}
                />{" "}
                Add New card
              </label>
            </div>

            <div
              className="row ml-5"
              id="newCard_Imp"
              style={this.state.newCard ? {} : { display: "none" }}
              >
              <div className="col-md-6 mb-3">
                <label>Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="card_name"
                  name="nameOnCard"
                  pattern="[a-zA-Z ]*"
                  />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
              </div>
              <div className="col-md-6 mb-3">
                <label>Card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="card_number"
                  name="cardNumber"
                  pattern="\d*"
                  minLength="16"
                  maxLength="16"
                  />
              </div>
            </div>
            <div
              className="row ml-5"
              id="newCard_Misc"
              style={this.state.newCard ? {} : { display: "none" }}
              >
              <div className="col-md-6 mb-3">
                <label>Expiry</label>
                <input
                  style={!this.isChrome? {display : "none"} : {}}
                  type="month"
                  className="form-control"
                  min="2020-07"
                  max="2030-07"
                  name="cardExpiry"
                  />

                <input
                  style={this.isChrome? {display : "none"} : {}}
                  type="text"
                  className="form-control"
                  name="cardExpiry_text"
                  pattern="[0-9]{4}-[0-9]{2}"
                  />
                <small className="text-muted" style={this.isChrome ? {display : "none"} : {}}>Format:2021-03</small>
              </div>
              <div className="col-md-3 mb-3">
                <label>CVV</label>
                <input
                  className="form-control"
                  id="card_cvv"
                  type="text"
                  name="cardCVV"
                  pattern="\d*"
                  minLength="3"
                  maxLength="3"
                  />
              </div>
            </div>
            <button
              className="button button-medium button-green-outline"
              type="submit"
              >
              Continue to checkout
            </button>
          </form>
        </div>
        <div className="flex-column ml-5 promo-section">
          <legend> Price </legend>
          <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <div className="my-0">{this.state.plan.plan}</div>
                  <small className="text-muted"></small>
                </div>
                <span className="text-muted">${this.state.plan.price}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-light d-none">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>{this.state.promoCode.code}</small>
                </div>
                <span className="text-success">
                  -${this.state.promoCode.value}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (CAD)</span>
                <strong>${this.state.plan.total}</strong>
              </li>
            </ul>
            <form className="card p-2" onSubmit={this.redeemCouponCode}>
              <div className="input-group">
                <input
                  type="text"
                  name="couponCode"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <Link to="/profile" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
    <p>Made with <i className="fas fa-heart"></i> in Halifax &copy; 2020</p>
    <nav>
      <Link to="/profile">About Us</Link>
      <Link to="/profile">Contact Us</Link>
      <Link to="/profile">Privacy Policy</Link>
    </nav>
  </footer>
</div>
);
}
}
