import React, { useState, useEffect, Component, Fragment } from "react";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  withLeaflet
} from "react-leaflet";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import community from "./images/community.png"; // Tell Webpack this JS file uses this image
import historical from "./images/historical.png";
import personal from "./images/personal.png";
import default_marker from "./images/default.png";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Control from "react-leaflet-control";
import ModalEditPinForm from "./ModalEditPinForm";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import ModalPinForm from "./ModalPinForm";
import SearchIcon from "@material-ui/icons/Search";
import SearchSidebar from "../layout/SidebarTest";
import { Markup } from "interweave";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { EsriProvider } from "leaflet-geosearch";

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
  //  console.log("----PLACEMENT----");
  //  console.log(props.placement);
  let { path, url } = useRouteMatch();
  //  console.log(props.darkMode + " darkmode ");
  // need to enter props.placement directly - if not used directly, when placement is updated the marker does not center on proper coordinates
  // const [userposition, setUserPosition] = useState([props.placement.userlat, props.placement.userlng]);
  // EsriProvider allows for zip code search - nominatum (OSM) does not
  // others include bing and google
  const [provider, setProvider] = useState(new EsriProvider()); // new OpenStreetMapProvider();
  // can change provider to preference

  const [mapInstance, setMapInstance] = useState();
  // const [map, setMap] = useState();
  const searchControl = new GeoSearchControl({
    provider: provider,
    autocomplete: true,
    style: "bar",
    animateZoom: true,
    retainZoomLevel: true,
    searchLabel: "Add story by address",
    showMarker: false,
    showPopup: false,
    autoClose: true,
    keepResult: true
  });

  const updatePin = marker => {
    //  console.log("updating pin");
    props.seteditPin({
      id: marker.id,
      title: marker.title,
      description: marker.description,
      category: marker.category,
      startDate: marker.startDate,
      endDate: marker.endDate
    });
    props.setPinData(marker);
    props.setSidebarOpen(false);
    if (!props.storySidebarOpen) {
      props.setStorySidebarOpen(!props.storySidebarOpen);
      //  console.log("story sidebar is " + !props.storySidebarOpen);
    }
  };

  const centerMarker = marker => {
    // setUserPosition([marker.latitude, marker.longitude]);

    props.setPlacement({
      id: marker.id,
      userlat: marker.latitude,
      userlng: marker.longitude
    });
  };

  const addressSearch = e => {
    //  console.log(e);
    const longitude = e.location.x;
    const latitude = e.location.y;
    //  console.log("lat and lng");
    //  console.log(longitude);
    //  console.log(latitude);
    props.setPlacement({
      id: "",
      userlat: latitude,
      userlng: longitude
    });
    props.setaddPinValues({
      ...props.addPinValues,
      latitude: latitude,
      longitude: longitude
    });

    // setUserPosition([latitude, longitude]);
    //  console.log(props.placement);
    //  console.log("was the coords");
    props.toggle();
    // this.setState({userlat : latitude, userlng: longitude, modal: true});

    // .search({ query: this.state.searchText })
    // .then(function(result) {
    //   // do something with result;

    // });
    //  console.log("here");
  };

  // used for adding the map reference for fly to and address search
  useEffect(() => {
    if (mapInstance) {
      let map = mapInstance.leafletElement;
      props.setMapReference(mapInstance.leafletElement);
      //  console.log("trying to add address");
      map.addControl(searchControl);
      map.on("geosearch/showlocation", addressSearch);
    }
  }, [mapInstance]);

  return (
    <div className="map-container" style={props.divStyle}>
      {/*{props.mapReference ? console.log(props.mapReference) : " map is undefined"}*/}
      {props.setPinDeleted ? props.setPinDeleted(false) : ""}{" "}
      <Map
        center={[props.placement.userlat, props.placement.userlng]}
        zoom={15}
        maxZoom={30} //shows map
        id="map"
        zoomControl={false}
        style={props.divStyle}
        ref={e => {
          setMapInstance(e);
        }}
        //   onClick={props.addMarker}
        onContextMenu={props.addMarker}
      >
        <ZoomControl position="bottomleft" />
        {props.darkMode ? ( //pass in props of user
          <TileLayer
            attribution="Map tiles by &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        ) : (
          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />
        )}
        {props.showSidebarButton ? (
          <Control position={"topleft"}>
            <button
              className={"btn btn-primary"}
              id="open-sidebar-button"
              onClick={() => {
                props.setStorySidebarOpen(false);
                props.setSidebarOpen(!props.sidebarOpen);
              }}
            >
              <SearchIcon></SearchIcon>
            </button>
          </Control>
        ) : null}
        <Control position={"topright"}>
          <button
            onClick={() => props.setdarkMode(!props.darkMode)}
            className="btn btn-primary"
          >
            Dark Mode
          </button>
        </Control>
        <Control position={"bottomright"}>
          <div>
            <button onClick={props.getLocation} className="btn btn-primary">
              <MyLocationIcon></MyLocationIcon>
            </button>
          </div>
        </Control>

        <MarkerClusterGroup>
          {props.pins.map((marker, index) => {
            let canManagePin = false;
            let post = [marker.latitude, marker.longitude];
            let categoryIcon = "";
            if (marker.category == 1) {
              categoryIcon = personalIcon;
            } else if (marker.category == 2) {
              categoryIcon = communityIcon;
            } else {
              categoryIcon = historicalIcon;
            }

            if (props.isAuthenticated) {
              if (props.user.id == marker.owner || props.userRoleVerified) {
                canManagePin = true;
              }
            }

            // if (isAuthenticated) {
            // //  console.log("user is authenticated!");
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
              <Marker
                key={index}
                position={post}
                icon={categoryIcon}
                onClick={() => updatePin(marker)}
              >
                <Popup>
                  <strong>{marker.title}</strong>
                  <br />
                  <Markup content={marker.description} />
                  <br />
                  <br />

                  <Link to={`${props.maplink}/${marker.id}`}>
                    <button
                      type="button"
                      onClick={() => centerMarker(marker)}
                      className="btn btn-primary btn-sm"
                    >
                      View Story
                    </button>
                  </Link>
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
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

        <Marker
          position={[props.placement.userlat, props.placement.userlng]}
          icon={defaultPointerIcon}
        ></Marker>
      </Map>
      <ModalPinForm
        toggle={props.toggle}
        modalState={props.modalState}
        setAnonRadius={props.setAnonRadius}
        {...props}
      />
      <ModalEditPinForm
        toggle={props.editToggle}
        modalState={props.editpinmodalState}
        onSubmit={props.onEditSubmit}
        userForm={props.editPin}
        setuserForm={props.seteditPin}
      />
      <ModalDeleteConfirm
        toggle={props.toggleDelete}
        modalState={props.deleteConfirmation}
        onSubmit={props.onDelete}
      />
    </div>
  );
};

export default LeafletMap;
