import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export default function Resources() {
  return (
  <div className={"main-content-div"}>
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Resources</h2>
      </div>
    </div>
  </div>
  );
}
