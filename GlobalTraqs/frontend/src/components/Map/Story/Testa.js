import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
function Testa() {
  let { id } = useParams();
  const yeet = id ? "true" : "false";
  return (
    <div>
      {id} whut {yeet}
    </div>
  );
}

export default Testa;
