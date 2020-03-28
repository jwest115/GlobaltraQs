import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import Sidebar from "react-sidebar";
import {
  IconButton,
} from "@material-ui/core";
import { searchPins } from "../../actions/pins";
import { getPins } from "../../actions/pins";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { Markup } from "interweave";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Slider from "@material-ui/core/Slider"
import { Label } from "reactstrap";

import InputGroup from "react-bootstrap/InputGroup";
import {
  getUsers,
  searchUsers,
  getNextPreviousUsers
} from "../../actions/users";

const options = [
  { value: "1", label: "Personal" },
  { value: "2", label: "Community" },
  { value: "3", label: "Historical" }
];

const labelStyle = {
  marginRight: "10px"
};

function SearchSidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pinType, setPinType] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(options);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(props.minPinDate);
  const [endDate, setEndDate] = useState(props.maxPinDate);
  const pinData = useSelector(state => state.pins.pins);
  const users = useSelector(state => state.auth.users);
  const [userSearchText, setUserSearchText] = useState("");

  const [dateRange, setDateRange] = useState([props.minPinDate.getFullYear(), props.maxPinDate.getFullYear()]);

  useEffect(() =>{
    setDateRange([props.minPinDate.getFullYear(), props.maxPinDate.getFullYear()]);
  }, [props.minPinDate]);

  useEffect(() =>{
    setDateRange([props.minPinDate.getFullYear(), props.maxPinDate.getFullYear()]);
  }, [props.maxPinDate]);

  useEffect(() => {
    dispatch(getPins());
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onSetSidebarOpen = open => {
    setSidebarOpen({ sidebarOpen: open });
  };

  const submitSearch = e => {
    console.log("pin type " + pinType);
    e.preventDefault(); //prevents refresh of page
    console.log(startDate);
    console.log(endDate);
    const start =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    const end =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();
    let categorySearchQuery = "";
    if (selectedCategories == null) {
      setSelectedCategories(options);
    } else {
      for (const [index, value] of selectedCategories.entries()) {
        if (index < selectedCategories.length - 1) {
          console.log(value.value);
          categorySearchQuery += value.value + ",";
          console.log("is the num");
        } else {
          console.log(value.value);
          categorySearchQuery += value.value;
          console.log("is the num");
        }
      }
    }
    console.log(categorySearchQuery);
    console.log("is the query");
    dispatch(searchPins(searchText, categorySearchQuery, start, end));
  };
  const submitUserSearch = e => {
    e.preventDefault(); //prevents refresh of page
    dispatch(searchUsers(userSearchText));
  };
  function valuetext(value) {
    console.log(dateRange);
    console.log("slider val is " + value);
    return value;
  }

  const storySearch = (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={submitSearch} noValidate={true}>
        <div className={"form-group"}>
          <label>Search:</label>
          <input
            className="form-control"
            id="searchForm"
            label="Search"
            placeholder={"Search for stories"}
            name={"searchText"}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <label>Category: </label>
        <Select
          isMulti
          defaultValue={options}
          value={selectedCategories}
          onChange={categories => setSelectedCategories(categories)}
          options={options}
        />
        <InputGroup style={{ marginTop: "20px" }}>
          <Label style={labelStyle} for="startDate">
            Search date range
          </Label>
           <DatePicker
              value={startDate}
              minDate={new Date(props.minPinDate.getFullYear(), props.minPinDate.getMonth(), props.minPinDate.getDate() - 1, 0, 0, 0, 0)}
              maxDate={new Date(props.maxPinDate.getFullYear(), props.maxPinDate.getMonth(), props.maxPinDate.getDate() + 1, 0, 0, 0, 0)}
              onChange={date => {
                setStartDate(date);
                setDateRange([date.getFullYear(), endDate.getFullYear()]);
              }}
              format={"MM/dd/yyyy"}
            />
             <DatePicker
              value={endDate}
              onChange={date => {
                setEndDate(date);
                setDateRange([startDate.getFullYear(), date.getFullYear()]);
              }}
              format={"MM/dd/yyyy"}
            />
           <Slider
              min={Number(props.minPinDate.getFullYear())}
              max={Number(props.maxPinDate.getFullYear())}
              value={dateRange}
              valueLabelDisplay="auto"
              onChange={(event, newValue) => {
                console.log("new value " + newValue);
                setDateRange(newValue);
                startDate.setFullYear(newValue[0]);
                endDate.setFullYear(newValue[1]);
              }}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          {/*<Slider*/}
          {/*  min={props.minPinYear}*/}
          {/*  max={props.maxPinYear}*/}
          {/*  onChange={(event, newValue) => { setDateRange(newValue);*/}
          {/*    console.log(event);*/}
          {/*    console.log(newValue);}*/}
          {/*  }*/}
          {/*  valueLabelDisplay="auto"*/}
          {/*  aria-labelledby="range-slider"*/}
          {/*  getAriaValueText={valuetext}*/}
          {/*/>*/}
          {/*<DatePicker*/}
          {/*  selected={startDate}*/}
          {/*  onChange={date => setStartDate(date)}*/}
          {/*/>*/}
          {/*<Label*/}
          {/*  style={{ marginLeft: "20px", marginRight: "20px" }}*/}
          {/*  for="startDate"*/}
          {/*>*/}
          {/*  to*/}
          {/*</Label>*/}
          {/*<DatePicker selected={endDate} onChange={date => setEndDate(date)} />*/}
        </InputGroup>
        <div className="form-group">
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>
      <div>
        <p style={{ marginTop: "50px", marginBottom: "20px" }}>
          {" "}
          {pinData.length}{" "}
          {pinData.length == 1 ? " search result" : " search results"}{" "}
        </p>

        {pinData.map((story, index) => {
          return (
            <Card style={{ marginTop: "5px" }}>
              <Link
                style={{ textDecoration: "inherit" }}
                to={`story/${story.id}`}
                params={{ testvalue: "hello" }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {story.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Markup content={story.description} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );

  let resultCount = pinData.length;
  console.log(props.minPinDate + " is MIN PIN DATE");
  console.log(dateRange + " is the date range");

  return (
    <Sidebar
      sidebar={
        <div style={{ padding: "5px 5px 5px 5px" }}>
          <IconButton
            onClick={() => props.setSidebarOpen(false)}
            style={{ float: "right" }}
            aria-label="close"
          >
            <CloseIcon color="disabled"></CloseIcon>
          </IconButton>
          <div style={{ marginTop: "20px" }}>
            <Tabs defaultActiveKey="stories" id="uncontrolled-tab-example">
              <Tab eventKey="stories" title="Search Stories">
                {storySearch}
              </Tab>
              <Tab eventKey="users" title="Search Users">
                <UserSearchForm
                  previous={users.previous}
                  next={users.next}
                  count={users.count}
                  onSubmit={submitUserSearch}
                  setUserSearchText={setUserSearchText}
                  userSearchText={userSearchText}
                />
                {users.results && <ListUsersSearch users={users.results} />}
              </Tab>
            </Tabs>
          </div>
        </div>
      }
      open={props.sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      pullRight={true}
      styles={{
        sidebar: { background: "white", width: "40%", padding: "20px" },
        overlay: {
          position: "absolute",
          visibility: "hidden",
          transition: "none",
          backgroundColor: "transparent"
        }
      }}
    >
      {console.log(pinData.length + " is the length")}
    </Sidebar>
  );
}

export default SearchSidebar;

const UserSearchForm = props => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={props.onSubmit}>
        <div className={"form-group"}>
          <label>Search: </label>
          <input
            className="form-control"
            id="searchForm"
            label="Search"
            placeholder={"Search for users"}
            name={"userSearchText"}
            onChange={e => props.setUserSearchText(e.target.value)}
            value={props.userSearchText}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary"
          >
            Search
          </button>
          {props.previous ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.previous))}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          {props.next ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.next))}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <p style={{ marginTop: "50px", marginBottom: "20px" }}>
          {" "}
          {props.count}{" "}
          {props.count === 1 ? " search result" : " search results"}{" "}
        </p>
      </div>
    </div>
  );
};

const ListUsersSearch = props => {
  return (
    <>
      {props.users.map((user, index) => {
        return (
          <Card key={index} style={{ marginTop: "5px" }}>
            <Link style={{ textDecoration: "inherit" }} to={`users/${user.id}`}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.username}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        );
      })}
    </>
  );
};
