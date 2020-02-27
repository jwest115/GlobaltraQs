import React, { Component, Fragment } from "react";
import { Map, Marker, Popup, TileLayer, ZoomControl, withLeaflet } from "react-leaflet";
import { getPins, deletePins } from "../../actions/pins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PinForm from "./PinForm";
import SearchSidebar from "../layout/SidebarTest";
import community from "./images/community.png"; // Tell Webpack this JS file uses this image
import historical from "./images/historical.png";
import personal from "./images/personal.png";
import default_marker from "./images/default.png";
import { Link } from "react-router-dom";
import EditPin from "./EditPin";
import L from "leaflet";
//import Modal from "./Modal1";
import Control from "react-leaflet-control";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Markup } from 'interweave';

//import LocateControl from "react-leaflet-locate-control";
import AddBoxIcon from '@material-ui/icons/AddBox';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { ReactLeafletSearch } from 'react-leaflet-search';
// import
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const divStyle = {
  height: "100%",
  width: "100%"
};

const months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

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
      open: false,
      searchText: '',
      provider:  new OpenStreetMapProvider()
    };
  }

  static propTypes = {
    pins: PropTypes.array.isRequired,
    getPins: PropTypes.func.isRequired,
    deletePins: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.map = this.mapInstance.leafletElement;
    const searchControl = new GeoSearchControl({
      provider: this.state.provider,
      autocomplete: true,
      style: 'bar',
      animateZoom: true,
      retainZoomLevel: true,
      searchLabel: 'Add story by address',
      showMarker: false,
      showPopup: false,
      autoClose: true,
      keepResult: true
    });

    this.map.addControl(searchControl);
    this.map.on('geosearch/showlocation', this.addressSearch);


    this.props.getPins();
    this.getLocation();
    // this.intervalID = setInterval(this.props.getPins.bind(this), 5000); //every 5 seconds it gets data
  }
  /*   componentWillUnmount() {
    clearInterval(this.intervalID);
  } */

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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

  addressSearch = (e) => {
    console.log(e);
    const provider = this.state.provider;
    const longitude = e.location.x;
    const latitude = e.location.y;
    this.setState({userlat : latitude, userlng: longitude, modal: true});

      // .search({ query: this.state.searchText })
      // .then(function(result) {
      //   // do something with result;
      //   console.log(result)
      // });
    console.log("here");
  };


  render() {


    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

    let anonymousMap = false;
    if(user == null) {
      anonymousMap = true;
    }
    else if(user != null && user.is_anonymous_active) {
      anonymousMap = true;
    }

    const position = [this.state.lat, this.state.lng];
    let userposition = [this.state.userlat, this.state.userlng];
    // TODO need to fix this in order to show current marker position in individual story page
    if(this.props.latitude && this.props.longitude) {
       userposition=[this.props.latitude, this.props.longitude];
        console.log("lat and long are set from props");
    }
    console.log(this.props.latitude);
    console.log(this.props.longitude);

    let isAdminOrModerator = false;
    let adminModeratorEditStory = "";

    return (
      <Fragment>
        {/*<a*/}
        {/*  onClick={() => props.handleName(sidebarOpen)}*/}
        {/*  />*/}
        <Map
          center={userposition}
          zoom={15}
          maxZoom={30} //shows map
          minZoom={5}
          id="map"
          zoomControl={false}
          style={divStyle}
          ref={e => {
            this.mapInstance = e;
          }}
          //user click for location
          // right click to add pin
          onContextMenu={this.addMarker}
        >
          <ZoomControl position="bottomleft" />

          {anonymousMap ? (
           <TileLayer
	        attribution= "Map tiles by &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          /> ) :

          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          /> }

          <Control position={"bottomright"}>
            {/*<div>*/}
            {/*  <button*/}
            {/*    onClick={() => this.createStory(true)}*/}
            {/*    className="btn btn-primary add-story-button"*/}
            {/*  >*/}
            {/*    <AddBoxIcon></AddBoxIcon>*/}
            {/*  </button>*/}
            {/*</div>*/}
            <div>
              <button
                onClick={() => this.getLocation()}
                className="btn btn-primary"
              >
                <MyLocationIcon></MyLocationIcon>
              </button>
            </div>
          </Control>
          <Control position={"topright"}>
            <div>
            </div>
            {/*<div>*/}
            {/*  <form onSubmit={this.addressSearch}>*/}
            {/*       <input*/}
            {/*        className="form-control"*/}
            {/*        label="Search"*/}
            {/*        placeholder={"Add story by address"}*/}
            {/*        name={"searchText"}*/}
            {/*        onChange={this.onChange}*/}
            {/*        value={this.state.searchText}*/}
            {/*     />*/}
            {/*      <button type="submit" style={{ float: "right" }} className="btn btn-primary">*/}
            {/*        Search*/}
            {/*      </button>*/}
            {/*  </form>*/}
            {/*</div>*/}
          </Control>

          <MarkerClusterGroup>
            {this.props.pins.map((marker, index) => {
              // let newlyAddedMarker = false;
              // if (index == this.props.pins.length - 1) {
              //   // last one
              //   console.log("newest");
              //   console.log(marker.title);
              //   newlyAddedMarker = true;
              // }
              let post = [marker.latitude, marker.longitude];
              let categoryIcon = "";
              if (marker.category == 1) {
                categoryIcon = personalIcon;
              } else if (marker.category == 2) {
                categoryIcon = communityIcon;
              } else {
                categoryIcon = historicalIcon;
              }

              let startSplit = marker.startDate.split('-');
              let start = new Date(startSplit[0], Number.parseInt(startSplit[1]) - 1, startSplit[2]);
              console.log("start " + startSplit[1] + "/" + startSplit[2] + "/" + startSplit[0]);
              console.log("start " + start);

              let selectedStartMonthName = months[start.getMonth()];
              let startDateFormatted = selectedStartMonthName + " " + start.getDate() + ", " + start.getFullYear();
              console.log("original " + start);
              let endSplit = marker.endDate.split('-');
              let end = new Date(endSplit[0], Number.parseInt(endSplit[1]) - 1, endSplit[2]);
              console.log("end " + end);

              let selectedEndMonthName = months[end.getMonth()];
              let endDateFormatted = selectedEndMonthName + " " + end.getDate() + ", " + end.getFullYear();

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
              let markerInstance;
              return (
                <Marker key={index} position={post} icon={categoryIcon}>
                  <Popup>

                    <strong>{marker.title}</strong><br/>{startDateFormatted} - {endDateFormatted} <br/> <br/>
                    <Markup content={marker.description} />
                    <br />
                    {marker.description}
                    <br />
                    <br />

                    {/*<EditPin*/}
                    {/*  userlat={marker.latitude}*/}
                    {/*  userlng={marker.longitude}*/}
                    {/*  storyid={marker.id}*/}
                    {/*/>*/}
                    {/* <Link to="/Story"> */}
                    {/*  UNCOMMENT THIS TO SHOW EDIT FORM FOR VALIDATED AUTHORS AND ADMINS/MODERATORS  */}
                     {this.state.showEditForm && (
                      <EditPin
                        title={marker.title}
                        description={marker.description}
                        userlat={marker.latitude}
                        userlng={marker.longitude}
                        storyid={marker.id}
                        user_id={marker.owner}
                        startDate={start}
                        endDate={end}
                      />
                    )}
                    {isAdminOrModerator ? adminModeratorEditStory : ""}
                    <Link
                      to={`/Story/${marker.id}`}
                      params={{ storyId: marker.id }}
                    >
                      <button type="button" className="btn btn-primary btn-sm">
                        View Story
                      </button>
                    </Link>
                    {/*{isAdminOrModerator ? (*/}
                    {/*      <button onClick={this.props.deletePins.bind(this, marker.id)}*/}
                    {/*              type="button"*/}
                    {/*              className="btn btn-danger btn-sm">*/}
                    {/*        Delete*/}
                    {/*      </button>*/}
                    {/*        )*/}
                    {/*    : ""}*/}
                  </Popup>
                  {/*{newlyAddedMarker ? this.leafletElement.openPopup() : ""}*/}
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
          {/*<ReactLeafletSearchComponent*/}
          {/*  position="topright"*/}
          {/*  inputPlaceholder="Add story by address"*/}
          {/*  openSearchOnLoad={true}*/}
          {/*  closeResultsOnClick={true}*/}
          {/*  zoom={15}*/}
          {/*  markerIcon={defaultPointerIcon}*/}
          {/*  showPopup={false}*/}
          {/*/>*/}
        </Map>

        {this.state.modal ? (
          <Modal
            userlat={this.state.userlat}
            userlng={this.state.userlng}
            submitAddress={this.state.submitAddress}
            toggle={this.toggle}
            owner={userid}
            map={this.map}
          />
        ) : null}
        {/*<PinForm userlat={this.state.userlat} userlng={this.state.userlng} />*/}
        {/* change AddPin PinForm for working form */}
        {/*  <div id={"sidebar"}>*/}
        {/*      <SearchSidebar />*/}
        {/*    </div>*/}
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
