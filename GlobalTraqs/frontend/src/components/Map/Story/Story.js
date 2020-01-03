import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
function Story() {
  let { id } = useParams();
  return <div>{id}</div>;
}

export default Story;
