import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footerr-wrap">
        <div className="footer">
          <div className="footer-contact">
            <b>Address:</b>
            <p>
              298 West Broadway <br /> New York, NY 10048
            </p>

            <b>Phone Number:</b>
            <p>(212) 348-2329</p>

            <b>E-Mail:</b>
            <p>theillissionproject@gmail.com</p>
          </div>
          <form action="/newsletter" method="POST">
            <div className="footer-newsletter">
              <b className="footer-news">Join Our Newsletter</b>
              <br />
              <input
                className="footer-placeholder"
                placeholder="name@email.com"
              ></input>
              <br />
              <button className="footer-signup">Sign Up</button>
            </div>
          </form>
          <div className="footer-links">
            <b>Shop</b>
            <br />
            <b>Our Story</b>
            <br />

            <div className="footer-social">
              <i class="fab fa-instagram" />
              &nbsp; &nbsp;
              <i class="fab fa-facebook-square" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
