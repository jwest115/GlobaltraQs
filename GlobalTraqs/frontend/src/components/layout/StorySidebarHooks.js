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
import Moment from "react-moment";
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

   const onSetSidebarOpen = (open) => {
       setSidebarOpen({ sidebarOpen: open });
    };

   let canManagePin = false;
   if (props.isAuthenticated) {
      if (props.pinData && props.user.id == props.pinData.owner || props.userRoleVerified) {
        canManagePin = true;
      }
   }

   console.log("SIDE BAR IS " + props.storySidebarOpen);
   if(props.storySidebarOpen) {
       return (
           <Sidebar
               sidebar={
                   <div>
                       {props.pinData ? (
                           <div>
                               <h1>{props.pinData.title}</h1>
                               <h5>By: {props.pinData.is_anonymous_pin ? "Anonymous" : props.pinData.username}</h5>
                               <Moment format="MM/DD/YYYY">{props.pinData.startDate}</Moment> -{" "}<Moment
                               format="MM/DD/YYYY">{props.pinData.endDate}</Moment>{" "}
                               <br/>
                               <br/>
                               <Markup content={props.pinData.description}/>
                           </div>
                       ) : null}
                       {canManagePin ? (
                           <div>
                               <div className="admin-moderator-edit">
                                   <button
                                       type="button"
                                       className="btn btn-primary btn-sm"
                                       onClick={e =>
                                           props.seteditpinmodalState(!props.editpinmodalState)
                                       }
                                   >
                                       Edit
                                   </button>
                               </div>
                               <button
                                   type="button"
                                   className="btn btn-primary btn-sm"
                                   onClick={e =>
                                       props.setDeleteConfirmation(!props.deleteConfirmation)
                                   }
                               >
                                   Delete
                               </button>
                           </div>
                       ) : null}
                   </div>
               }
               open={props.storySidebarOpen}
               // onSetOpen={onSetSidebarOpen}
               pullRight={true}
               styles=
                   {{
                       sidebar: {background: "white", width: "40%", padding: "20px"},
                       overlay: {
                           position: "absolute",
                           visibility: "hidden",
                           transition: "none",
                           backgroundColor: "transparent"
                       }
                   }}
           >
           </Sidebar>
       );
   }
   else {
       return null;
   }
}

export default StorySidebar;