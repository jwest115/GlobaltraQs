import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";
import ManageFlag from "./ManageFlag";
import ManageUsers from "./ManageUsers";
export default function Manage() {
  let { path, url } = useRouteMatch();
  console.log("the path is " + path + " and the url is " + url);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  return (
    <div className="container-fluid">
      {" "}
      <div>
        <ul>
          <li>
            <Link to={`/manage`}>Manage</Link>
          </li>
          <li>
            <Link to={`/manage/flag`}>Check Flags</Link>
          </li>
          <li>
            <Link to={`/manage/users`}>Manage user</Link>
          </li>
        </ul>

        <hr />
      </div>
      <Switch>
        <Route exact path={`/manage`}>
          <MainManage />
          {path}
          <Locate />
        </Route>
        <Route path={`/manage/flag`}>
          <ManageFlag />
        </Route>
        <Route path={`/manage/users`}>
          <ManageUsers />
        </Route>
      </Switch>
    </div>
  );
}

function MainManage() {
  let { setting } = useParams();

  return (
    <div>
      {setting}
      <h2>this is admin mod manage</h2>
    </div>
  );
}

function Locate() {
  let location = useLocation();
  return <div>{location.pathname}</div>;
}
