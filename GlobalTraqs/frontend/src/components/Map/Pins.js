import React, { Component, Fragment } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { getPins, deletePins } from "../../actions//pins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinForm from "./PinForm";
import Sidebar from "../layout/Sidebar";
import community from "./images/community.png"; // Tell Webpack this JS file uses this image
import historical from "./images/historical.png";
import personal from "./images/personal.png";
import default_marker from "./images/default.png";
import { Link } from "react-router-dom";
import EditPin from "./EditPin";
import L from "leaflet";
import Modal from "./Modal";
import Control from "react-leaflet-control";
import MarkerClusterGroup from "react-leaflet-markercluster";
//import LocateControl from "react-leaflet-locate-control";

const divStyle = {
  height: "100%",
  width: "100%"
};

export const defaultPointerIcon = new L.Icon({
  iconUrl: default_marker,
  iconRetinaUrl: default_marker,
  iconAnchor: [28, 61],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const communityIcon = new L.Icon({
  iconUrl: community,
  iconRetinaUrl: community,
  iconAnchor: [28, 61],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const historicalIcon = new L.Icon({
  iconUrl: historical,
  iconRetinaUrl: historical,
  iconAnchor: [28, 61],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const personalIcon = new L.Icon({
  iconUrl: personal,
  iconRetinaUrl: personal,
  iconAnchor: [28, 61],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});
export const abcd = {};

export class Pins extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      lat: 34.0668,
      lng: -118.1684,
      zoom: 10,
      maxZoom: 30,
      userlat: 34.0668,
      userlng: -118.1684,
      selectedLat: "",
      selectedLong: "",
      submitAddress: true,
      modal: false,
      categoryType: personalIcon,
      editButtonValue: "Edit Story",
      open: false
    };
  }

  static propTypes = {
    pins: PropTypes.array.isRequired,
    getPins: PropTypes.func.isRequired,
    deletePins: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getPins();
    this.getLocation();
    // this.intervalID = setInterval(this.props.getPins.bind(this), 5000); //every 5 seconds it gets data
  }
  /*   componentWillUnmount() {
    clearInterval(this.intervalID);
  } */

  editStory = () => {
    if (this.state.showEditForm) {
      this.setState({
        showEditForm: false,
        editButtonValue: "Edit Story"
      });
    } else {
      this.setState({
        showEditForm: true,
        editButtonValue: "Close"
      });
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  createStory = address => {
    const item = { title: "", description: "", address: "" };
    this.setState({ submitAddress: address, modal: !this.state.modal });
  };

  addMarker = e => {
    if(e.button == 2) {
      console.log("right!");
    }
    else {
      console.log("not right");
    }
    this.setState({ userlat: e.latlng.lat });
    this.setState({ userlng: e.latlng.lng });
    this.createStory(false);
  };

  setUserLocation = () => {
    this.setState({ userlat: userlat });
    this.setState({ userlng: userlng });
    this.setState({ lat: 34.0522 });
    this.setState({ lng: -118.2437 });
  };
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        succes => {
          console.log(succes.coords.latitude + "" + succes.coords.longitude);
          this.setState({
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
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";
    const position = [this.state.lat, this.state.lng];
    const userposition = [this.state.userlat, this.state.userlng];
    let isAdminOrModerator = false;
    let adminModeratorEditStory = "";
    let sidebarOpen = true;


    return (
      <Fragment>
              {/*<a*/}
              {/*  onClick={() => props.handleName(sidebarOpen)}*/}
              {/*  />*/}
              <Sidebar yeet={sidebarOpen} />
        <Map
          center={userposition}
          zoom={15}
          maxZoom={30} //shows map
          id="map"
          style={divStyle}
          //user click for location
          // right click to add pin
          onContextMenu={this.addMarker}
        >
          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />

          <Control>
            <div>
              <button
                onClick={() => this.createStory(true)}
                className="btn btn-primary add-story-button"
              >
                Add<br></br>Story
              </button>
            </div>
            <div>
              <button
                onClick={() => this.getLocation()}
                className="btn btn-primary add-story-button"
              >
                ys
              </button>
            </div>
          </Control>

          <MarkerClusterGroup>
            {this.props.pins.map((marker, index) => {
              let post = [marker.latitude, marker.longitude];
              let categoryIcon = "";
              if (marker.category == 1) {
                categoryIcon = personalIcon;
              } else if (marker.category == 2) {
                categoryIcon = communityIcon;
              } else {
                categoryIcon = historicalIcon;
              }

               if (isAuthenticated) {
                  console.log("user is authenticated!");
                    if (user.is_administrator || user.is_moderator || marker.owner == user.id) {
                      isAdminOrModerator = true;
                      console.log("user is admin or moderator! let them edit!");
                      adminModeratorEditStory = (
                          <div className="admin-moderator-edit">
                            <button
                                onClick={this.editStory}
                                className="btn btn-success admin-moderator-edit"
                            >
                              {this.state.editButtonValue}
                            </button>
                          </div>
                      );
                      console.log("user is an admin or moderator!");
                    }
               }
              //const id = marker.id;

              return (
                <Marker key={index} position={post} icon={categoryIcon}>
                  <Popup>
                  <strong>{marker.title}</strong><br/>{marker.description}
                    <br />
                    <br />

                    {/*<EditPin*/}
                    {/*  userlat={marker.latitude}*/}
                    {/*  userlng={marker.longitude}*/}
                    {/*  storyid={marker.id}*/}
                    {/*/>*/}
                    {/* <Link to="/Story"> */}
                    {/*  UNCOMMENT THIS TO SHOW EDIT FORM FOR VALIDATED AUTHORS AND ADMINS/MODERATORS  */}
                    {/* {this.state.showEditForm && (*/}
                    {/*  <EditPin*/}
                    {/*    title={marker.title}*/}
                    {/*    description={marker.description}*/}
                    {/*    userlat={marker.latitude}*/}
                    {/*    userlng={marker.longitude}*/}
                    {/*    storyid={marker.id}*/}
                    {/*    user_id={marker.owner}*/}
                    {/*  />*/}
                    {/*)}*/}
                    {/*{isAdminOrModerator ? adminModeratorEditStory : ""}*/}
                    <Link
                      to={`Story/${marker.id}`}
                      params={{ testvalue: "hello" }}
                    >
                      <button type="button" className="btn btn-primary btn-sm">
                        View Story
                      </button>
                    </Link>
                    {isAdminOrModerator ? (
                          <button onClick={this.props.deletePins.bind(this, marker.id)}
                                  type="button"
                                  className="btn btn-danger btn-sm">
                            Delete
                          </button>
                            )
                        : ""}
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
          {console.log(
            "userposition: " + this.state.userlat + " " + this.state.userlng
          )}
          {/* current selected posisiotn
                 {console.log(this.state.userlat)}
                    {console.log(this.state.userlng)} */}

          <Marker position={userposition} icon={defaultPointerIcon}></Marker>
        </Map>
        {this.state.modal ? (
          <Modal
            userlat={this.state.userlat}
            userlng={this.state.userlng}
            submitAddress={this.state.submitAddress}
            toggle={this.toggle}
            refreshList={this.refreshList}
            owner={userid}
          />
        ) : null}
        {/*<PinForm userlat={this.state.userlat} userlng={this.state.userlng} />*/}
        {/* change AddPin PinForm for working form */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  //state of redux
  pins: state.pins.pins,
  auth: state.auth // state.pins we want pins reducer from index, .pins is from initial state
});

export default connect(mapStateToProps, { getPins, deletePins })(Pins);
