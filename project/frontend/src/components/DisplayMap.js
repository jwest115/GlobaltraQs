import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Button } from 'react-bootstrap';
import Modal from "./Modal";
import axios from "axios";
import L from 'leaflet';
import PropTypes from "prop-types";
import {deletePins, getPins} from "../actions/pins";
import connect from "react-redux/es/connect/connect";
import marker1 from '../../static/frontend/images/community.png' // Tell Webpack this JS file uses this image
import marker2 from '../../static/frontend/images/historical.png' // Tell Webpack this JS file uses this image
import marker3 from '../../static/frontend/images/personal.png' // Tell Webpack this JS file uses this image
import marker4 from '../../static/frontend/images/default.png' // Tell Webpack this JS file uses this image



export const defaultPointerIcon = new L.Icon({
  iconUrl: marker4,
  iconRetinaUrl: marker4,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

export default class DisplayMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAddress: true,
            modal: false,
            lat: 34.0668,
            lng: -118.1684,
            zoom: 15,
            maxZoom: 30,
            data: [],
            userlat: 0,
            userlng: 0,
            categoryType: marker1
        }
    }
    // componentDidMount() {
    //     fetch('../api/story')
    //         .then(response => response.json())
    //         .then(data => this.setState({ data }));
    //     console.log(this.data.length);
    // }
    // static propTypes = {
    //     pins: PropTypes.array.isRequired,
    //     getPins: PropTypes.func.isRequired,
    //     deletePins: PropTypes.func.isRequired
    // }
    componentDidMount() {
        this.refreshList();
    }
    refreshList = () => {
        axios
            .get("http://127.0.0.1:8000/api/pins/")
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
      };

    createStory = (address) => {
        const item = { title: "", description: "", address:""};
        this.setState({submitAddress: address, modal: !this.state.modal })
      };

    addMarker = (e) => {
        this.setState({ userlat: e.latlng.lat })
        this.setState({ userlng: e.latlng.lng })
        this.createStory(false)
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const userposition = [this.state.userlat, this.state.userlng];
        return (
        <main>
              <Map center={position} zoom={this.state.zoom} maxZoom = {this.state.maxZoom} onClick={this.addMarker}>
>
                <TileLayer
                        attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                />
              {this.state.data.map((marker, index) => {
                  let pointerIcon = new L.Icon({
                  iconUrl: marker4,
                  iconRetinaUrl: marker4,
                  iconAnchor: [5, 55],
                  popupAnchor: [10, -44],
                  iconSize: [55, 55],
                  shadowSize: [68, 95],
                  shadowAnchor: [20, 92],
                })

                  // can probably do this part better ---> only did it this way because of a big I did not want to fix today
                    let post = [marker.latitude, marker.longitude];
                    let category = marker.category;
                    if(category == 'community') {
                        pointerIcon = new L.Icon({
                          iconUrl: marker1,
                          iconRetinaUrl: marker1,
                          iconAnchor: [5, 55],
                          popupAnchor: [10, -44],
                          iconSize: [55, 55],
                          shadowSize: [68, 95],
                          shadowAnchor: [20, 92],
                        })
                    }
                    else if(category =='historical') {
                        pointerIcon = new L.Icon({
                          iconUrl: marker2,
                          iconRetinaUrl: marker2,
                          iconAnchor: [5, 55],
                          popupAnchor: [10, -44],
                          iconSize: [55, 55],
                          shadowSize: [68, 95],
                          shadowAnchor: [20, 92],
                        })
                    }
                    else if(category == 'personal'){
                       pointerIcon = new L.Icon({
                          iconUrl: marker3,
                          iconRetinaUrl: marker3,
                          iconAnchor: [5, 55],
                          popupAnchor: [10, -44],
                          iconSize: [55, 55],
                          shadowSize: [68, 95],
                          shadowAnchor: [20, 92],
                        })
                    }
                    return (
                        <Marker key={index} position={post} icon={pointerIcon}>
                            <Popup>
                                <b>{marker.title}</b> <br /> {marker.description}
                            </Popup>
                        </Marker>
                    );
                })}

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
                data={this.state.data}
                // onSave={this.handleSubmit}
              />
            ) : null}
             <button onClick={() => this.createStory(true)} className="btn btn-primary add-story-button">
                      Add Story
             </button>
        </main>

            );

    }

}

// const mapStateToProps = state => ({
//     pins: state.pins.pins
// })
//
// export default connect(
//     mapStateToProps, { getPins, deletePins })
//     (DisplayMap);
