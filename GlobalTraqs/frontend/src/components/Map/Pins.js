import React, { Component, Fragment } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { getPins, deletePins } from '../../actions//pins'
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import PinForm from "./PinForm"
import community from "./images/community.png"// Tell Webpack this JS file uses this image
import historical from "./images/historical.png"
import personal from "./images/personal.png"
import default_marker from "./images/default.png"
import { Link } from 'react-router-dom'
import EditPin from './EditPin';
import L from 'leaflet'
import Modal from "./Modal";


const divStyle = {
    height: '90%',
    width: '100%'

};


export const defaultPointerIcon = new L.Icon({
  iconUrl: default_marker,
  iconRetinaUrl: default_marker,
  iconAnchor: [28, 61],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});

export const communityIcon = new L.Icon({
    iconUrl: community,
    iconRetinaUrl: community,
    iconAnchor: [28, 61],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
});

export const historicalIcon = new L.Icon({
    iconUrl: historical,
    iconRetinaUrl: historical,
    iconAnchor: [28, 61],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
});

export const personalIcon = new L.Icon({
    iconUrl: personal,
    iconRetinaUrl: personal,
    iconAnchor: [28, 61],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
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
            submitAddress: true,
            modal: false,
            categoryType: personalIcon
        }
    }

    static propTypes = {
        pins: PropTypes.array.isRequired,
        getPins: PropTypes.func.isRequired,
        deletePins: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getPins();
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
      };

    createStory = (address) => {
        const item = { title: "", description: "", address:""};
        this.setState({submitAddress: address, modal: !this.state.modal })
      };

    addMarker = (e) => {
        this.setState({ userlat: e.latlng.lat });
        this.setState({ userlng: e.latlng.lng });
        this.createStory(false)
    };




    render() {

        const position = [this.state.lat, this.state.lng];
        const userposition = [this.state.userlat, this.state.userlng];

        return (
            <Fragment>
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

                        <Marker position={userposition} icon={defaultPointerIcon}>
                        </Marker>


                    </Map>
                     {this.state.modal ? (
                  <Modal
                    userlat={this.state.userlat}
                    userlng={this.state.userlng}
                    submitAddress = {this.state.submitAddress}
                    toggle={this.toggle}
                    refreshList={this.refreshList}
                  />
                ) : null}
                 <button onClick={() => this.createStory(true)} className="btn btn-primary add-story-button">
                          Add Story
                 </button>

                {/*<PinForm userlat={this.state.userlat} userlng={this.state.userlng} />*/}
                {/* change AddPin PinForm for working form */}
            </Fragment >
        );
    }

}

const mapStateToProps = state => ({ //state of redux
    pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state
});

export default connect(
    mapStateToProps, { getPins, deletePins })
    (Pins);