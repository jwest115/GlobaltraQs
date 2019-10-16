import React, { Component, Fragment } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { getPins, deletePins } from '../../actions//pins'
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import PinForm from "./PinForm"
import L from 'leaflet'
import AddPinForm from './AddPinForm';
import pinRed from './assets/pinRed.png'
import rocket from './assets/rocket.png'

const divStyle = {
    height: '720px',
    width: '1080px'

}
export const pointerIcon = new L.Icon({
    iconUrl: rocket,
    iconRetinaUrl: rocket,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowUrl: rocket,
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
})

export class Pins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 34.0668,
            lng: -118.1684,
            zoom: 10,
            maxZoom: 30,
            data: [],
            userlat: 0,
            userlng: 0,
            value: ""
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
                <img src={rocket} />
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
                            return (
                                <Marker key={index} position={post}>
                                    <Popup>
                                        {marker.title} <br /> {marker.description} <br />  <button onClick=
                                            {this.props.deletePins.bind(this, marker.id)}
                                            type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </Popup>
                                </Marker>
                            );
                        })}
                        {/* current selected posisiotn   
                 {console.log(this.state.userlat)}
                    {console.log(this.state.userlng)} */}

                        <Marker position={userposition} icon={pointerIcon} >
                            <Popup>
                                Your position <br /> yeet
                            </Popup>
                        </Marker>

                        {console.log(pointerIcon)}
                    </Map>

                </div>
                <PinForm userlat={this.state.userlat} userlng={this.state.userlng} />
                {/* change AddPin PinForm for working form */}
            </Fragment>

        );
    }

}

const mapStateToProps = state => ({
    pins: state.pins.pins
})

export default connect(
    mapStateToProps, { getPins, deletePins })
    (Pins);
