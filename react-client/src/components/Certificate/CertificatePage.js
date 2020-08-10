import React, { Component } from "react";
import CertificateGenerate from "./CertificateGenerate";
import auth from "../../authentication/Auth";
import Footer from "../Common/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import saveSvgAsPng from "save-svg-as-png";
import svgAsDataUri from "save-svg-as-png";
import Header from "../LandingPage/Header";

export class CertificatePage extends Component {
  getName = () => {
    const userName = `${auth.user.firstName.toUpperCase()} ${auth.user.lastName.toUpperCase()}`;
    return userName;
  };

  getDate = () => {
    var date = new Date();

    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var dd = date.getDate();
    var month = monthNames[date.getMonth()];
    var yyyy = date.getFullYear();

    const printableDate = `${dd} ${month}, ${yyyy}`;
    return printableDate;
  };

  getCertificateNo = () => {
    let id1 = auth.user.firstName.substring(0, 3).toUpperCase();
    let id2 = auth.user.lastName.substring(0, 3).toUpperCase();
    let date = Date.now();
    const certificateNo = `SL-${id1}-${id2}-${date}`;
    return certificateNo;
  };

  generatePdf = () => {
    const fileName = `Certificate_${this.getCertificateNo().replace(/-/g, "")}`;
    saveSvgAsPng.saveSvgAsPng(document.getElementById("conv-png"), fileName);
  };

  render() {
    return (
      <>
        {/* <Header /> */}
        <div className="container">
          {console.log(auth.user)}
          <h2>Certificate of Completion</h2>
          <hr className="thick" />
          <div className="container" style={{ padding: "0px" }}>
            <CertificateGenerate
              userName={this.getName()}
              issueDate={this.getDate()}
              certificateNo={this.getCertificateNo()}
            />
          </div>

          <button
            className="button button-small button-green-outline"
            onClick={this.generatePdf}
          >
            <i className="fa fa-download" style={{ marginRight: "0.3rem" }} />
            Download
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

export default CertificatePage;
