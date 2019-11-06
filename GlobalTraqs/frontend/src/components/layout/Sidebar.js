import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { TextField, Select, FormControl, MenuItem } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import Header from "./Header";
import PropTypes from "prop-types";
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function Sidebar() {
  const [age, setAge] = React.useState("");
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className={classes.list} role="presentation">
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleDrawer("right", false)}
      >
        Close
      </Button>
      <Divider />
      <TextField></TextField>
      <div>
        <FormControl>
          <Select
            labelid="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={0}>Personal</MenuItem>
            <MenuItem value={1}>Community</MenuItem>
            <MenuItem value={2}>Historical</MenuItem>
          </Select>
          <FormHelperText>Select Pin Type</FormHelperText>
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleDrawer("right", false)}
      >
        Search
      </Button>
    </div>
  );

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>Open Right</Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
