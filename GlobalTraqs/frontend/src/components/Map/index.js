import React from 'react'
import L from 'leaflet'


import styled from 'styled-components'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};

`;

export default class Map extends React.Component {
    componentDidMount() {
        this.map = L.map('map', {
            center: [34.0668, -118.1684],
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