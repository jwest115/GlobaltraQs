import React, { Componenet } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";

const App = () => (
    <DataProvider endpoint="api/pins/"
        render={data => <Table data={data} />} />
);

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;