import React, { useState, useEffect } from "react";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import community from "./images/community.png"; // Tell Webpack this JS file uses this image
import historical from "./images/historical.png";
import personal from "./images/personal.png";
import default_marker from "./images/default.png";
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Control from "react-leaflet-control";
import ModalEditPinForm from "./PinForms/ModalEditPinForm";
import ModalDeleteConfirm from "./PinForms/ModalDeleteConfirm";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import ModalAddPinForm from "./PinForms/ModalAddPinForm";
import SearchIcon from "@material-ui/icons/Search";
import { GeoSearchControl } from "leaflet-geosearch";
import { EsriProvider } from "leaflet-geosearch";
import { useDispatch } from "react-redux";

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
  let { path, url } = useRouteMatch();
  const history = useHistory();
  // need to enter props.placement directly - if not used directly, when placement is updated the marker does not center on proper coordinates
  // EsriProvider allows for zip code search - nominatum (OSM) does not
  // others include bing and google
  const [provider, setProvider] = useState(new EsriProvider()); // new OpenStreetMapProvider();
  // can change provider to preference
  const dispatch = useDispatch();

  const [mapInstance, setMapInstance] = useState();
  const [markerClusterGroupInstance, setMarkerClusterGroupInstance] = useState();

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
     if(props.isIndividualStoryPage) {
      props.seteditPin({
        id: marker.id,
        title: marker.title,
        description: marker.description,
        category: marker.category,
        startDate: marker.startDate,
        endDate: marker.endDate,
        lastEditDate: marker.lastEditDate,
        lastPersonEdit: props.isAuthenticated ? props.user.id : null
      });
      console.log("should change url params");
      props.setPinData(marker);
      history.push(`${props.maplink}/${marker.id}`);
    }
    else {
      props.seteditPin({
        id: marker.id,
        title: marker.title,
        description: marker.description,
        category: marker.category,
        startDate: marker.startDate,
        endDate: marker.endDate,
        lastEditDate: marker.lastEditDate,
        lastPersonEdit: props.isAuthenticated ? props.user.id : null
      });
      props.setPinData(marker);
      props.setPinCluster(false);
      props.setSidebarOpen(false);
      if (!props.storySidebarOpen) {
        props.setStorySidebarOpen(!props.storySidebarOpen);
      }
    }
  };

  const centerMarker = marker => {
    mapInstance.leafletElement.panTo([marker.latitude, marker.longitude]);

    props.setPlacement({
      id: marker.id,
      userlat: marker.latitude,
      userlng: marker.longitude
    });
  };

  const addressSearch = e => {
    const longitude = e.location.x;
    const latitude = e.location.y;
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
    props.toggle();
  };

  // used for adding the map reference for fly to and address search
  useEffect(() => {
    console.log("map container style");
    console.log(props.mapContainerStyle);

    if (mapInstance) {
      let map = mapInstance.leafletElement;
      props.setMapReference(mapInstance.leafletElement);
      map.addControl(searchControl);
      map.on("geosearch/showlocation", addressSearch);
    }
  }, [mapInstance]);

  useEffect(() => {
    console.log("setting map container style");
    props.setMapContainerStyle({ height: "100%"});
  },[]);

  return (
    <div className="map-container" style={props.mapContainerStyle}>
      {props.setPinDeleted ? props.setPinDeleted(false) : ""}{" "}
      <Map
        center={[props.placement.userlat, props.placement.userlng]}
        zoom={15}
        maxZoom={18} //shows map
        minZoom={1}
        worldCopyJump={true}
        id="map"
        zoomControl={false}
        style={props.divStyle}
        ref={e => {
          setMapInstance(e);
        }}
        onContextMenu={props.addMarker}
      >
        <ZoomControl position="bottomleft" />
        {props.user == undefined || props.user.is_anonymous_active ? ( //pass in props of user
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
        <Control position={"bottomright"}>
          <div>
            <button onClick={props.getLocation} className="btn btn-primary">
              <MyLocationIcon></MyLocationIcon>
            </button>
          </div>
        </Control>

        <MarkerClusterGroup
            //set to false for marker cluster
            // spiderfyOnMaxZoom={false}
            spiderfyOnMaxZoom={true}
            maxClusterRadius={40}
            // commenting out marker clustering - needs to be refactored
            // onClusterClick={(e) => {
            //     console.log("zoooom");
            //     console.log(mapInstance.leafletElement.getZoom());
            //   if(mapInstance.leafletElement.getZoom() > 16) {
            //     let markers = e.layer.getAllChildMarkers();
            //     console.log(markers);
            //     console.log(mapInstance.leafletElement.getZoom() + " is the zoom");
            //     props.setPinData(markers);
            //     props.setPinCluster(true);
            //     props.setStorySidebarOpen(true);
            //   }
            // }}
        >

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

            return (
              <Marker
                key={index}
                position={post}
                icon={categoryIcon}
                data={marker}
                onClick={() => { centerMarker(marker); updatePin(marker); }}
                onMouseOver={(e) => { e.target.openPopup(); }}
                onMouseOut={(e) => { e.target.closePopup(); }}
              >
                <Popup>
                  <strong>{marker.title}</strong>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

      </Map>
      <ModalAddPinForm
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
