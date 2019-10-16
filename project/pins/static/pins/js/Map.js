import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: window.latitude,
            longitude: window.longitude,
            zoom: 10,
            maxZoom: 30,
            data: [],
            userLatitude: 0,
            userLongitude: 0
        }
    }

    componentDidMount() {
        fetch()
    }

    addMarker = (e) => {
        this.setState({ userLatitude: e.latlng.lat })
        this.setState({ userLongitude: e.latlng.lng })
    }

    render() {
        const position = [this.state.latitude, this.state.longitude];
        const userPosition = [this.state.userLatitude, this.state.userLongitude];

        return(
            <div id="map" >
                <Map center={position} zoom={15} maxZoom={30} //shows map
                    id="map"
                    //user click for location
                    onClick={this.addMarker}>
                    <TileLayer
                        attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    />


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
                    <Marker position={userPosition} >
                        <Popup>
                            Your position <br /> yeet
                        </Popup>
                    </Marker>
                    {/*<PinForm userlat={this.state.userlat} />*/}
                </Map>
            </div>
        )
    }
}