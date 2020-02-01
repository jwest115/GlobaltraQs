import React, { Fragment, useState, useEffect } from "react";
import {
  getPins,
  getPin,
  addPin,
  editPin,
  deletePins,
  addComment,
  deleteComment
} from "../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import LeafletMap from "./LeafletMap";
import SearchSidebar from "../layout/SidebarHooks";
import Story from "./Story/Story";


const sidebarStyle = {
  position: "absolute",
  top: "0",
  height: "100%",
  zIndex: "1000",
  overflow: "hidden",
  right: "0px"
  // z-index: 1000;
  // position: absolute;
  // height: 100%;
  // overflow: hidden;
  // width: 100%;
  // top: 0;
};

export default function MapDashboard() {
  let { path, url } = useRouteMatch();

  const [divStyle, setdivStyle] = useState({
    height: "90%",
    width: "100%"
  });
  const [divStyle1, setdivStyle1] = useState({
    height: "40vh",
    width: "100%",
    left: "0"
  });

  const [placement, setplacement] = useState({
    id: "",
    userlat: 34.0522,
    userlng: -118.2437
  });

  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPins());
  }, []);
  useEffect(() => {
    getLocation();
  }, []);

  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  const [modalState, setmodalstate] = useState(false); //opens modal for adding new pins
  const [editpinmodalState, seteditpinmodalState] = useState(false); // opens modal for editing pin
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebarButton, setShowSidebarButton] = useState(false);
  const [userForm, setuserForm] = useState({
    // fields for new pins
    title: "",
    description: "",
    category: 1,
    startDate: "",
    endDate: "",
    owner: isAuthenticated ? user.id : "",
    latitude: placement.userlat,
    longitude: placement.userlng
  });
  const [editPinForm, seteditPinForm] = useState({
    //fields for editng
    id: "1",
    title: "1",
    description: "1",
    category: "1"
  });
  const onEditSubmit = e => {
    //patches the selected pin
    e.preventDefault();

    dispatch(editPin(editPinForm, editPinForm.id));
    editToggle();
    seteditPinForm({
      //clears
      id: "",
      title: "",
      description: "",
      category: 1
    });
  };
  const [radiusUser, setRadiusUser] = useState(1); //radius for anon
  const addMarker = e => {
    setplacement({
      ...placement,
      userlat: e.latlng.lat,
      userlng: e.latlng.lng
    });
    setuserForm({
      ...userForm,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng
    });

    setmodalstate(!modalState);
  };
  const toggle = () => {
    setmodalstate(!modalState);
  };
  const editToggle = () => {
    seteditpinmodalState(!editpinmodalState);
  };
  const resetState = () => {
    setuserForm({
      title: "",
      description: "",
      category: 1,
      startDate: "",
      endDate: "",
      owner: isAuthenticated ? user.id : "",
      latitude: "",
      longitude: ""
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log("submit");
    console.log(userForm);
    dispatch(addPin(userForm));
    resetState();
    setmodalstate(!modalState);
  };
  const setAnonRadius = radius => {
    setRadiusUser(radius);

    let randomLat;
    let randomLng;
    const lat = placement.userlat;
    const lng = placement.userlng;
    let sign1 = Math.round(Math.random());
    let sign2 = Math.round(Math.random());
    if (radius === "2") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLat = Math.random() * (0.008 - 0.001) + 0.001 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLng = Math.random() * (0.008 - 0.001) + 0.001 + lng;
      }
    } else if (radius === "3") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLat = Math.random() * (0.03 - 0.01) + 0.01 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLng = Math.random() * (0.03 - 0.01) + 0.01 + lng;
      }
    } else if (radius === "4") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLat = Math.random() * (0.1 - 0.05) + 0.05 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLng = Math.random() * (0.1 - 0.05) + 0.05 + lng;
      }
    } else {
      randomLat = lat;
      randomLng = lng;
    }
    console.log(
      "random lat is " +
        randomLat +
        " random lng is " +
        randomLng +
        " the selection is " +
        radius
    );
    setuserForm({
      ...userForm,
      latitude: randomLat,
      longitude: randomLng
    });
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [pinDeleted, setPinDeleted] = useState(false);

  const toggleDelete = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };
  const onDelete = e => {
    e.preventDefault();
    dispatch(deletePins(editPinForm.id));
    toggleDelete();
    setPinDeleted(true);
    console.log("confirm delted" + editPinForm.id);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        succes => {
          console.log(succes.coords.latitude + "" + succes.coords.longitude);
          setplacement({
            ...placement,
            userlat: succes.coords.latitude,
            userlng: succes.coords.longitude
          });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
        }
      );
    }
  }

  const [userComment, setuserComment] = useState({
    pin: "",
    description: "lit"
  });
  const [toggleComment, settoggleComment] = useState(false);
  const onSubmitComment = e => {
    e.preventDefault();
    const submit = {
      ...userComment,
      commenter: user.id
    };
    dispatch(addComment(submit));
    // dispatch(addComment(userComment));
  };
  const onDeleteComment = commentid => {
    dispatch(deleteComment(commentid));
  };

  return (
    <div id={"map-dashboard"}>
    {/*<div>*/}
      <Fragment>
        <Switch>
          <Route exact path="/">
             <div id={"sidebar-style"}>
                <SearchSidebar
                  sidebarOpen={sidebarOpen}
                />
              </div>
            <LeafletMap
              maplink={"/test"}
              pins={pins}
              divStyle={divStyle}
              addMarker={addMarker}
              placement={placement}
              setPlacement={setplacement}
              modalState={modalState}
              toggle={toggle}
              onSubmit={onSubmit}
              userForm={userForm}
              setuserForm={setuserForm}
              editPin={editPinForm}
              seteditPin={seteditPinForm}
              editToggle={editToggle}
              editpinmodalState={editpinmodalState}
              seteditpinmodalState={seteditpinmodalState}
              onEditSubmit={onEditSubmit}
              radiusUser={radiusUser}
              setAnonRadius={setAnonRadius}
              deleteConfirmation={deleteConfirmation}
              setDeleteConfirmation={setDeleteConfirmation}
              onDelete={onDelete}
              toggleDelete={toggleDelete}
              getLocation={getLocation}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              pinDeleted={pinDeleted}
              setPinDeleted={setPinDeleted}
              showSidebarButton={true}
            />
          </Route>
          <Route path="/test">
             {console.log("the placement:")}
            {console.log(placement)}
             {pinDeleted ? (
                <Redirect to={"/"}/> )
                : null}
            <LeafletMap
              maplink={"/test"}
              pins={pins}
              divStyle={divStyle1}
              addMarker={addMarker}
              placement={placement}
              setPlacement={setplacement}
              modalState={modalState}
              toggle={toggle}
              onSubmit={onSubmit}
              userForm={userForm}
              setuserForm={setuserForm}
              editPin={editPinForm}
              seteditPin={seteditPinForm}
              editToggle={editToggle}
              editpinmodalState={editpinmodalState}
              seteditpinmodalState={seteditpinmodalState}
              onEditSubmit={onEditSubmit}
              radiusUser={radiusUser}
              setAnonRadius={setAnonRadius}
              deleteConfirmation={deleteConfirmation}
              setDeleteConfirmation={setDeleteConfirmation}
              onDelete={onDelete}
              toggleDelete={toggleDelete}
              getLocation={getLocation}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              showSidebarButton={false}
            />
            <StoryDisplay
              placement={placement}
              setplacement={setplacement}
              toggleComment={toggleComment}
              settoggleComment={settoggleComment}
              userComment={userComment}
              setuserComment={setuserComment}
              onSubmitComment={onSubmitComment}
              onDeleteComment={onDeleteComment}
            />
          </Route>
        </Switch>
        {/* <Pins /> */}

        {/* <div id={"sidebar-style"}> */}
        <div>
           {/*<SearchSidebar />*/}
          {/* <MapDisplay /> */}
        </div>
      </Fragment>
    </div>
  );
}
function StoryDisplay(props) {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <IndividualStory {...props} />
        </Route>
        <Route path={match.path}>
          <h3>Please select an IndividualStory.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function IndividualStory(props) {
  let { id } = useParams();
  const pin = useSelector(state => state.pins.pin);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  useEffect(() => dispatch(getPin(id)), [id]);
  useEffect(
    () =>
      props.setuserComment({
        ...props.userComment,
        pin: id
      }),
    [id]
  );
  return (
    <Story pin={pin} user={user} isAuthenticated={isAuthenticated} {...props} />
  );
}
