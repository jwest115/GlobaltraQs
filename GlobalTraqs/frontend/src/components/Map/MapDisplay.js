import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const divStyle = {
    height: '720px',
    width: '1280px'

}
const markerList = [
    {
        lat: 34.0668,
        lng: -119.1684,
        name: "ABC Hospitals",
        info: 10
    },
    {
        lat: 35.442889,
        lng: -119.396873,
        name: "XYZ Hospitals",
        info: 20
    },
    {
        lat: 33.441681,
        lng: -118.394357,
        name: "NRI Hospitals",
        info: 10
    }
];
export default class MapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 34.0668,
            lng: -118.1684,
            zoom: 10,
            maxZoom: 30,
            data: [],
            userlat: 0,
            userlng: 0
        }
    }
    componentDidMount() {
        fetch('api/pins')
            .then(response => response.json())
            .then(data => this.setState({ data }));

    }
    addMarker = (e) => {
        this.setState({ userlat: e.latlng.lat })
        this.setState({ userlng: e.latlng.lng })
    }


    render() {

        const position = [this.state.lat, this.state.lng];
        const userposition = [this.state.userlat, this.state.userlng];
        return (
            <div id="map" >
                <Map center={position} zoom={15} maxZoom={30} //shows map
                    id="map" style={divStyle}
                    //user click for location
                    onClick={this.addMarker}>
                    <TileLayer
                        attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    />

                    <Marker position={position}>
                        <Popup>
                            {markerList[0].name}  <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {this.state.data.map((marker, index) => {
                        let post = [marker.latitude, marker.longitude];
                        return (
                            <Marker key={index} position={post}>
                                <Popup>
                                    {marker.title} <br /> {marker.description}
                                </Popup>
                            </Marker>
                        );
                    })}
                    {/* current selected posisiotn   
                 {console.log(this.state.userlat)}
                    {console.log(this.state.userlng)} */}

                    <Marker position={userposition} >
                        <Popup>
                            Your position <br /> yeet
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}
