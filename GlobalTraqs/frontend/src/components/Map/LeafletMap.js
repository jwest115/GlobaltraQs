import React, { useState, useEffect, Component, Fragment } from "react";

import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import community from "./images/community.png"; // Tell Webpack this JS file uses this image
import historical from "./images/historical.png";
import personal from "./images/personal.png";
import default_marker from "./images/default.png";
import { Link } from "react-router-dom";
import Control from "react-leaflet-control";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import ModalPinForm from "./ModalPinForm";
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
const LeafletMap = props => {
  const userposition = [props.placement.userlat, props.placement.userlng];
  return (
    <div>
      {" "}
      <Map
        center={userposition}
        zoom={15}
        maxZoom={30} //shows map
        id="map"
        zoomControl={false}
        style={props.divStyle}
        // ref={e => {
        //   this.mapInstance = e;
        // }}
        onContextMenu={props.addMarker}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        />

        <Control position={"bottomright"}>
          <div>
            <button
              onClick={() => this.getLocation()}
              className="btn btn-primary"
            >
              <MyLocationIcon></MyLocationIcon>
            </button>
          </div>
        </Control>

        <MarkerClusterGroup>
          {props.pins.map((marker, index) => {
            let post = [marker.latitude, marker.longitude];
            let categoryIcon = "";
            if (marker.category == 1) {
              categoryIcon = personalIcon;
            } else if (marker.category == 2) {
              categoryIcon = communityIcon;
            } else {
              categoryIcon = historicalIcon;
            }

            // if (isAuthenticated) {
            //   console.log("user is authenticated!");
            //   if (
            //     user.is_administrator ||
            //     user.is_moderator ||
            //     marker.owner == user.id
            //   ) {
            //     isAdminOrModerator = true;
            //     console.log("user is admin or moderator! let them edit!");
            //     adminModeratorEditStory = (
            //       <div className="admin-moderator-edit">
            //         <button
            //           //  onClick={this.editStory}
            //           className="btn btn-success admin-moderator-edit"
            //         >
            //           {/* {this.state.editButtonValue} */}
            //         </button>
            //       </div>
            //     );
            //     console.log("user is an admin or moderator!");
            //   }
            // }
            return (
              <Marker key={index} position={post} icon={categoryIcon}>
                <Popup>
                  <strong>{marker.title}</strong>
                  <br />
                  {marker.description}
                  <br />
                  <br />

                  <Link to={`map/${marker.id}`}>
                    <button type="button" className="btn btn-primary btn-sm">
                      View Story
                    </button>
                  </Link>
                  {/* {isAdminOrModerator ? (
                    <button
                      //   onClick={this.props.deletePins.bind(this, marker.id)}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )} */}
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

        <Marker position={userposition} icon={defaultPointerIcon}></Marker>
      </Map>
      <ModalPinForm
        toggle={props.toggle}
        modalState={props.modalState}
        onSubmit={props.onSubmit}
        register={props.register}
        handleSubmit={props.handleSubmit}
        watch={props.watch}
        errors={props.errors}
        control={props.control}
        startDate={props.startDate}
        setStartDate={props.setStartDate}
        enddate={props.enddate}
        setendDate={props.setendDate}
      />
    </div>
  );
};

export default LeafletMap;
