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
import ManageFlag from "./ManageFlag";
export default function Manage() {
  let { path, url } = useRouteMatch();
  console.log("the path is " + path + " and the url is " + url);
  return (
    <>
      <div className="container-fluid">
        {" "}
        <div>
          <ul>
            <li>
              <Link to={`/manage/flag`}>Check Flags</Link>
            </li>
            <li>
              <Link to={`manage/users`}>Manage user</Link>
            </li>
          </ul>

          <hr />
        </div>
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/:setting`}>
            <MainManage />
          </Route>
        </Switch>
      </div>
    </>
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
