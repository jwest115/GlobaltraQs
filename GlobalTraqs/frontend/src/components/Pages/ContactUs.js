import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
export default function contactUs() {
  const auth = useSelector(state => state.auth);

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (email != "") {
      // var data = JSON.stringify({ "name": name.value, "email": email.value });
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      // Request Body
      // const body = JSON.stringify({ username, email, password });
      let data = JSON.stringify({ email: email, message: message });
      axios.post("api/contactUs/", data, config).then(response => {
        console.log(response);
      });
    } else {
      setEmail("Anonymous@anon.com");

      axios
        .post("api/contactUs/", { email: email, message: message })
        .then(response => {
          console.log(response);
          alert("Your message has been sent");
        });
    }
  };

  return (
  <div className={"main-content-div"}>
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
  </div>
  );
}
