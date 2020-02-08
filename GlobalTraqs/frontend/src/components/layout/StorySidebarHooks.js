import React, { useState, useEffect, Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import connect from "react-redux/es/connect/connect";
import Sidebar from "react-sidebar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { TextField, FormControl, MenuItem, IconButton, responsiveFontSizes } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import { searchPins } from "../../actions/pins";
import { getPins } from "../../actions/pins";
import pins from "../../reducers/pins";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import SearchIcon from '@material-ui/icons/Search';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { Markup } from 'interweave';

import {
  Label
} from "reactstrap";

import { Marker, Popup } from "react-leaflet";
import InputGroup from "react-bootstrap/InputGroup";

const labelStyle = {
  marginRight: "10px"
};


function StorySidebar(props)  {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    // const pinData = useSelector(state => state.pins.pins);


    useEffect (() => {
        dispatch(getPins());
    }, []);

   const onSetSidebarOpen = (open) => {
       setSidebarOpen({ sidebarOpen: open });
    };


    return (
        <Sidebar
            sidebar={
                <div>
                    {props.pinData ? (
                        <div>
                            <h1>{props.pinData.title}</h1>
                            <h5>By: {props.pinData.is_anonymous_pin ? "Anonymous" : props.pinData.username}</h5>
                            <h6>{props.pinData.startDate} - {props.pinData.endDate}</h6>
                            <Markup content={props.pinData.description}/>
                        </div>
                        ) : null}
                </div>
            }
            open={props.sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            pullRight={true}
            styles=
                {{ sidebar: { background: "white", width: "40%", padding: "20px" },
                    overlay: { position: "absolute", visibility: "hidden", transition: "none", backgroundColor: "transparent"}
                }}
            >
        </Sidebar>
    );
}

export default StorySidebar;