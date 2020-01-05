import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { TextField, Select, FormControl, MenuItem, IconButton, responsiveFontSizes } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


export default function Sidebar() {
  const [pinType, setPinType] = React.useState('');

  const classes = useStyles();
  const [drawerState, setState] = React.useState({
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

    setState({ ...drawerState, [side]: open });
  };

  var text = document.getElementById("searchForm");
  var type = document.getElementById("pinForm");
  const sideList = side => (
    <div className={classes.list} role="presentation">
      <CssBaseline />
      <form>
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
              value={pinType}
              onChange={handleChange}
            >
              <MenuItem value={1}>Personal</MenuItem>
              <MenuItem value={2}>Community</MenuItem>
              <MenuItem value={3}>Historical</MenuItem>
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
    
      </form>
    </div>
  );
  //more data in the card? like author or creation data?
  //cards with lizard use
  ////{this.state.pinData.description}

  if (text && type) {
    document.getElementById("searchButton").addEventListener("click", function () {
      console.log("Searched For : " + text.value + ". Category is : " + type.value);
      axios.get(`api/pins?category=${type.value}`).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].title);
          console.log(response.data[i].description)
        }
      })
        .catch(error => {
          console.log(error);
        });
    });
  }

  /*
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {response.data[i].title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {response.data[i].description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
  */

  const handleChange = event => {
    setPinType(event.target.value);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={toggleDrawer("right", true)}>
      </Button>
      <Drawer
        anchor="right"
        open={drawerState.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>

  );

}
