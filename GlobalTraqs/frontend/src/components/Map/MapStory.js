import React, { Component } from "react";
import {
  communityIcon,
  defaultPointerIcon,
  historicalIcon,
  personalIcon
} from "./Pins";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { getPins } from "../../actions/pins";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Story from "./Story";
const divStyle2 = {
  paddingLeft: "0px",
  paddingRight: "0px"
};
const divStyle = {
  height: "40vh",
  width: "100%",
  left: "0"
};

export class MapStory extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getPins: PropTypes.func.isRequired,
    pins: PropTypes.array.isRequired
    //deletePins: PropTypes.func.isRequired
  };
  state = {
    latitude: 34,
    longitude: -118,
    url: "",
    id: ""
  };
  componentDidMount() {
    this.props.getPins();
  }

  render() {
    const position = [this.state.latitude, this.state.longitude];
    return (
      <div className="container-fluid" style={divStyle2}>
        <Map center={position} zoom={15} maxZoom={30} id="map" style={divStyle}>
          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />

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
              const id = marker.id;

              return (
                <Marker key={index} position={post} icon={categoryIcon}>
                  <Popup>
                    <strong>{marker.title}</strong> <br />{" "}
                    {marker.description.substring(0, 200)}
                    <br />
                    <br />
                    <Link to={`/${marker.id}`}> e </Link> View{" "}
                    <button
                      onClick={() => this.updateStoryId(id)}
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      View Story
                    </button>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </Map>

        <Switch>
          <Route exact path="/map">
            <h3>Please select a topic.</h3>
          </Route>
          <Route path="/map/:id" exact component={Story}>
            <Story />
          </Route>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state
  // pin: state.pin.pin
});
export default connect(mapStateToProps, { getPins })(MapStory);
