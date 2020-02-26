import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import Recaptcha from "react-recaptcha";
import * as EmailValidator from "email-validator";
import { REGISTER_FAIL } from "../../actions/types";
import axios from "axios";

export default function contactUs() {
  const auth = useSelector(state => state.auth);

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (email != "") {
      axios
        .post("api/contactUs/", {
          email: email,
          message: message
        })
        .then(response => {
          console.log(response);
        });
    } else {
      setEmail("Anonymous@anon.com");
      let data = JSON.stringify({
        email: email,
        message: message
      });
      axios
        .post("api/contactUs/", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Contact Us</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <br></br>
            <label>Message</label>
            <textarea
              rows="5"
              type="message"
              className="form-control"
              name="message"
              onChange={e => setMessage(e.target.value)}
            >
              {message}
            </textarea>
            {/* <input
              type="message"
              className="form-text"
              name="message"
              onChange={e =>
                setcontactForm({
                  ...contactForm,
                  message: e.target.value
                })
              }
              value={contactForm.message}
            /> */}
            <div />
            {/* <p className="text-danger">{contactForm.errors["email"]}</p> */}
          </div>
          <button type="submit" className="btn btn-primary float-left">
            CONTACT US
          </button>
        </form>
      </div>
    </div>
  );
}
