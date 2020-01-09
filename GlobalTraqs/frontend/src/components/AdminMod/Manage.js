import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Header from "./Header";
export default function Manage() {
  return (
    <>
      <div className="container-fluid">
        {" "}
        <Header />
        <div>test</div>
      </div>
    </>
  );
}
