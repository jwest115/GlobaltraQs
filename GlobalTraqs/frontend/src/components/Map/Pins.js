import React, { Component, Fragment } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { getPins, deletePins } from '../../actions//pins'
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import PinForm from "./PinForm";
import community from "./images/community.png"// Tell Webpack this JS file uses this image
import historical from "./images/historical.png"
import personal from "./images/personal.png"
import red_marker from "./images/red_marker.png"
import EditPin from './EditPin';
import { Link } from 'react-router-dom'

const divStyle = {
    height: '720px',
    width: '1080px'

}


export const defaultPointerIcon = new L.Icon({
    iconUrl: red_marker,
    iconRetinaUrl: red_marker,
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

export class Pins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 34.0668,
            lng: -118.1684,
            zoom: 10,
            maxZoom: 30,
            userlat: 0,
            userlng: 0,
            selectedLat: "",
            selectedLong: "",
        }
    }

    static propTypes = {
        pins: PropTypes.array.isRequired,
        getPins: PropTypes.func.isRequired,
        deletePins: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getPins();
    }

    addMarker = (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.setState({ userlat: e.latlng.lat })
        this.setState({ userlng: e.latlng.lng })

    }




    render() {

        const position = [this.state.lat, this.state.lng];
        const userposition = [this.state.userlat, this.state.userlng];

        return (
            <Fragment>
                <h2>pins</h2>
                <div id="map" >
                    <Map center={position} zoom={15} maxZoom={30} //shows map
                        id="map" style={divStyle}
                        //user click for location
                        onClick={this.addMarker}>
                        <TileLayer
                            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                        />


                        {this.props.pins.map((marker, index) => {
                            let post = [marker.latitude, marker.longitude];
                            let categoryIcon = ''
                            if (marker.category == 1) {
                                categoryIcon = personalIcon
                            } else if (marker.category == 2) {
                                categoryIcon = communityIcon
                            } else { categoryIcon = historicalIcon }
                            const id = marker.id

                            return (
                                <Marker key={index} position={post} icon={categoryIcon}>
                                    <Popup>
                                        {marker.title} <br /> {marker.description}
                                        <br />

                                        <EditPin userlat={marker.latitude} userlng={marker.longitude} storyid={marker.id} />
                                        {/* <Link to="/Story"> */}

                                        <Link to={`Story/${id}`}>
                                            <button type="button" className="btn btn-primary btn-sm">View Story</button>
                                        </Link>
                                        <button onClick=
                                            {this.props.deletePins.bind(this, marker.id)}
                                            type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </Popup>
                                </Marker>
                            );
                        })

                        }


                        {/* current selected posisiotn   
                 {console.log(this.state.userlat)}
                    {console.log(this.state.userlng)} */}

                        <Marker position={userposition} icon={defaultPointerIcon} >
                            <Popup>
                                Your position <br /> yeet
                            </Popup>
                        </Marker>


                    </Map>

                </div>
                <PinForm userlat={this.state.userlat} userlng={this.state.userlng} />
                {/* change AddPin PinForm for working form */}
            </Fragment >

        );
    }

}

const mapStateToProps = state => ({ //state of redux
    pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state
})

export default connect(
    mapStateToProps, { getPins, deletePins })
    (Pins);
