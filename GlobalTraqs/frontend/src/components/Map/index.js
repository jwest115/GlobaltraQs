import React from 'react'
import L from 'leaflet'
import styled from 'styled-components'

const markerList = [
    {
        lat: 34.0668,
        long: -118.1684,
        name: "ABC Hospitals",
        info: 10
    },
    {
        lat: 17.442889,
        long: 78.396873,
        name: "XYZ Hospitals",
        info: 20
    },
    {
        lat: 17.441681,
        long: 78.394357,
        name: "NRI Hospitals",
        info: 10
    }
];
const post = [markerList.lat, markerList.lon]
const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};

`;

export default class Map extends React.Component {
    componentDidMount() {

        this.map = L.map('map', {
            center: [markerList[0].lat, markerList[0].long],
            zoom: 15,
            zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
        }).addTo(this.map);
    }

    render() {
        return <Wrapper width="1280px " height="720px" id="map" />
    }
}