import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";
import visa from "../../assets/paymentMethodImages/visa.png";
import master from "../../assets/paymentMethodImages/master.png";
import diners from "../../assets/paymentMethodImages/diners.png";
import amex from "../../assets/paymentMethodImages/amex.png";
import "./Footer.css";
import { Twitter, WhatsApp, X } from "@mui/icons-material";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <h1>URBAN CULT</h1>
        <p>
          Welcome to Urban Cult Clothing, where fashion meets individuality! At
          Urban Cult, we believe clothing is more than just fabric—it's a
          statement of who you are. Born out of a passion for self-expression,
          our brand is dedicated to crafting bold, trend-setting designs that
          resonate with urban culture and modern lifestyles. Our journey began
          with a simple vision: to bridge the gap between street style and high
          fashion. Today, we’re proud to offer a diverse range of apparel that
          speaks to dreamers, creators, and go-getters who refuse to blend in.
          From edgy graphic tees to sleek outerwear, every piece is designed
          with meticulous attention to detail and a commitment to quality. We’re
          more than a clothing brand; we’re a movement. Urban Cult Clothing is
          for those who dare to stand out, redefine norms, and embrace their
          authentic selves. Join us as we inspire a culture of creativity,
          confidence, and fearless individuality. Step into the cult. Dress your
          ambition. Own your vibe. *Urban Cult Clothing – Style, Redefined.*
        </p>
      </div>
      <div className="footer-right">
        <h4>FOLLOW US ON</h4>
        <div className="social-media-icon-group">
          <IconButton>
            <FacebookIcon className="footer-icons" sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <InstagramIcon className="footer-icons" sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <WhatsApp className="footer-icons" sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <Twitter className="footer-icons" sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <X className="footer-icons" sx={{ color: "#ffffff" }} />
          </IconButton>
        </div>
        <h4>ACCEPT TO PAY</h4>
        <div className="payment-method-icon-group">
          <img src={visa} alt="visa card" className="payment-method-image" />
          <img
            src={master}
            alt="master card"
            className="payment-method-image"
          />
          <img
            src={diners}
            alt="diner's club card"
            className="payment-method-image"
          />
          <img
            src={amex}
            alt="american express card"
            className="payment-method-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
