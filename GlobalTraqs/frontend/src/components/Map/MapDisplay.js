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
            data: []
        }
    }
    componentDidMount() {
        fetch('api/pins')
            .then(response => response.json())
            .then(data => this.setState({ data }));
        /* .then((findresponse) => {
            console.log(findresponse)
        }) */
    }



    render() {

        const position = [this.state.lat, this.state.lng];
        const post = [34.07, -118.2];
        return (
            <div id="map" >
                <Map center={position} zoom={15} maxZoom={30}
                    id="map" style={divStyle}>
                    <TileLayer
                        attribution="&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
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



                </Map>
            </div>
        )
    }
}
