/**
 * Saved Cards List Component
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */


import React, { Component } from "react";
import { AddCard } from "../AddCard/";
import Swal from "sweetalert2";
import { fetchCardDetails, addCardDetails } from "../../../store";
import axios from "../../../authentication/axios-user-management";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    //

    this.state = {
      isAdd: false,
      cards: [],
    };

    this.isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    this.fetchCardInfo();
  }

  fetchCardInfo = () => {
    fetchCardDetails().then((result) => {
      this.setState({
        cards: result,
      });
    });
  };

  deleteCard = (card_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EE0E51",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        
        axios.delete("/payment/cards?cardID=" + card_id, {
          method: "DELETE",
        }).then(
            (result) => {
              Swal.fire("Deleted!", "Your card has been deleted.", "success");
              this.fetchCardInfo();
            },
            (error) => {}
          );
      }
    });
  };

  addNewCard = (event) => {
    event.preventDefault();

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
    //
    addCardDetails(newCard).then(
      (result) => {
        this.setState({
          isAdd: false,
        });
        Swal.fire("Success", "Card information saved successfuly!", "success");
        this.fetchCardInfo();
      },
      (error) => {
        this.setState({
          isAdd: false,
        });
      }
    );
  };

  render() {
    if (this.state.isAdd) {
      return (
        <div>
          <form className="flex-column" onSubmit={this.addNewCard}>
            <div className="form-group text-left">
              <label> Name on card </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  name="nameOnCard"
                  pattern="[a-zA-Z ]*"
                  required
                  />
              </div>
              <div className="form-group mt-3 text-left">
                <label> Card number </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    required
                    pattern="\d*"
                    minLength="16"
                    maxLength="16"
                    />
                </div>
                <div className="form-group mt-3 text-left">
                  <label> Expiry </label>{" "}
                    <input
                      style={!this.isChrome? {display : "none"} : {}}
                      type="month"
                      className="form-control"
                      min="2020-07"
                      max="2030-07"
                      name="cardExpiry"
                      required={!this.isChrome? false : true}
                      />

                    <input
                      style={this.isChrome? {display : "none"} : {}}
                      type="text"
                      className="form-control"
                      name="cardExpiry_text"
                      pattern="[0-9]{4}-[0-9]{2}"
                      required={this.isChrome? false : true}
                      />
                    <small className="text-muted" style={this.isChrome ? {display : "none"} : {}}>Format:2021-03</small>
                  </div>
                  <div className="form-group mt-3 text-left">
                    <label> CVV </label>{" "}
                      <input
                        type="text"
                        className="form-control"
                        name="cardCVV"
                        required
                        pattern="\d*"
                        minLength="3"
                        maxLength="3"
                        />
                    </div>
                    <button type="submit" className="button button-medium button-green-outline">
                      Save{" "}
                    </button>{" "}
                    <button
                      type="reset"
                      className="btn"
                      onClick={() => {
                        this.setState({ isAdd: false });
                      }}
                      >
                      Cancel
                    </button>
                  </form>{" "}
                </div>
      );
    } else {
      return (
        <div className="d-flex flex-column">
          <div className="card-deck payments-list">
            {this.state.cards.map((item, index) => (
              <AddCard key={index} details={item} handler={this.deleteCard}></AddCard>
            ))}
          </div>
          <div>
            <button
              className="button button-medium button-green-outline"
              onClick={() => {
                this.setState({ isAdd: true });
              }}
              >
              Add New Card
            </button>
          </div>
        </div>
      );
    }
  }
}
