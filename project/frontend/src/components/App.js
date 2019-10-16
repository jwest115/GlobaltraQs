// import React from "react";
// import ReactDOM from "react-dom";
// import DataProvider from "./DataProvider";
// import Table from "./Table";
// import Form from "./Form";
// import Header from "./layout/Header";
// const App = () => (
//   <React.Fragment>
//     <DataProvider endpoint="api/lead/"
//                   render={data => <Table data={data} />} />
//     <Form endpoint="api/lead/" />
//   </React.Fragment>
// );
// const wrapper = document.getElementById("app");
// // eslint-disable-next-line no-unused-expressions
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Header from './layout/Header';
import DataProvider from "./DataProvider";
import DisplayMap from './DisplayMap';
import Form from "./Form";
import { Provider } from 'react-redux'
import store from '../store';



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                <Header />
                <DataProvider endpoint="../api/pins"
                              render={data => <DisplayMap />} />

                </React.Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
