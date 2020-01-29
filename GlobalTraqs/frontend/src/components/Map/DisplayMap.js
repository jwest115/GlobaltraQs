import React, { Component } from "react";
import { render } from "react-dom";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import PropTypes from "prop-types";
import { deletePins, getPins } from "../../actions/pins";
import connect from "react-redux/es/connect/connect";
import community from "../../../static/frontend/images/community.png"; // Tell Webpack this JS file uses this image
import historical from "../../../static/frontend/images/historical.png"; // Tell Webpack this JS file uses this image
import personal from "../../../static/frontend/images/personal.png"; // Tell Webpack this JS file uses this image
import default_marker from "../../../static/frontend/images/default.png";
import { PinForm } from "./PinForm";
import red_marker from "../../../static/frontend/images/red_marker.png";
//import Modal from "./Modal";

export const defaultPointerIcon = new L.Icon({
  iconUrl: default_marker,
  iconRetinaUrl: default_marker,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const communityIcon = new L.Icon({
  iconUrl: community,
  iconRetinaUrl: community,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const historicalIcon = new L.Icon({
  iconUrl: historical,
  iconRetinaUrl: historical,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const personalIcon = new L.Icon({
  iconUrl: personal,
  iconRetinaUrl: personal,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export class DisplayMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitAddress: true,
      modal: false,
      lat: 34.0668,
      lng: -118.1684,
      zoom: 15,
      maxZoom: 30,
      data: [],
      userlat: 0,
      userlng: 0,
      categoryType: personalIcon
    };
  }

  static propTypes = {
    pins: PropTypes.array.isRequired,
    getPins: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getPins();
  }

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

  // put in nate's
  render() {
    const position = [this.state.lat, this.state.lng];
    const userposition = [this.state.userlat, this.state.userlng];
    return (
      <main>
        <Map
          center={position}
          zoom={this.state.zoom}
          maxZoom={this.state.maxZoom}
          onClick={this.addMarker}
        >
          >
          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />
          {this.props.pins.map((marker, index) => {
            // can probably do this part better ---> only did it this way because of a bug I did not want to fix today
            let post = [marker.latitude, marker.longitude];
            let category = marker.category;
            let categoryIcon = "";
            if (category == "community") {
              categoryIcon = communityIcon;
            } else if (category == "historical") {
              categoryIcon = historicalIcon;
            } else if (category == "personal") {
              categoryIcon = personalIcon;
            }
            return (
              <Marker key={index} position={post} icon={categoryIcon}>
                <Popup>
                  <b>{marker.title}</b> <br /> {marker.description}
                  <button
                    onClick={this.props.deletePins.bind(this, marker.id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </Popup>
              </Marker>
            );
          })}
          <Marker position={userposition} icon={defaultPointerIcon}></Marker>
        </Map>
        {this.state.modal ? (
          <Modal
            userlat={this.state.userlat}
            userlng={this.state.userlng}
            submitAddress={this.state.submitAddress}
            toggle={this.toggle}
            refreshList={this.refreshList}
            data={this.state.data}
          />
        ) : null}
        <button
          onClick={() => this.createStory(true)}
          className="btn btn-primary add-story-button"
        >
          Add Story
        </button>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  pins: state.pins.pins
});

export default connect(mapStateToProps, { getPins });
