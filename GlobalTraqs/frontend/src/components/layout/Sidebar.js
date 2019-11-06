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
import { TextField, Select, FormControl, MenuItem, IconButton } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import Header from "./Header";
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
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
      <TextField
          id="searchForm"
          className={classes.textField}
          label="Search"
          margin="none"
          fullWidth
          variant="filled">
        
      </TextField>
      <div>
        <FormControl>
          <Select
            labelid="demo-simple-select-helper-label"
            id="pinForm"
            fullWidth
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
        id="searchButton"
        fullWidth
        //onClick={toggleDrawer("right", false)}
      >
        Search
      </Button>
    </div>
  );

  var text = document.getElementById("searchForm");
  var type = document.getElementById("pinForm");
  if(text){
  document.getElementById("searchButton").addEventListener("click", function() {
      console.log( "Search for " + text.value + ". With Pin Type " + type.value );
  });
  }
  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button 
      variant="contained" 
      color="dedfault"
      className={classes.button}
      startIcon={<SearchIcon/>}
      onClick={toggleDrawer("right", true)}>
      </Button>
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
