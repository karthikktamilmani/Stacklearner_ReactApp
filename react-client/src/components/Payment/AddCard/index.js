/**
 * Add Card Component
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

import React from "react";
import './index.scss';

export function AddCard(props) {
  const { _id, nameOnCard, cardNumber, cardExpiry } = props.details;

  return (
    <div className="card mr-2 mb-4 gray-background" style={{ minWidth: "18rem" }}>
      <div className="card-header">
        <div className="card-label">Card Number</div>
        <h5 className="font-weight-normal float-left">{cardNumber}</h5>
        <button
          type="button"
          className="btn float-right"
          aria-label="Close"
          onClick={() => props.handler(_id)}
          style={!props.handler ? { display: "none" } : {}}
        >
          <i className="fa fa-times close-icon"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="float-left">
        <div className="card-label">Card Name</div>
        <h6 className="card-title"> {nameOnCard} </h6>
        </div>
        <div className="float-right">
        <div className="card-label">Expiry</div>
        <h6 className="card-title"> {cardExpiry} </h6>
        </div>
      </div>
    </div>
  );
}
