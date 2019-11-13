// displays Modal pop up
// handles form submission when user clicks on the map to select a pin drop point

import React, { Component } from "react";
import PropTypes from "prop-types";
import { addPin } from "../../actions/pins";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import { Marker, Popup } from "react-leaflet";

const labelStyle = {
  marginRight: "10px"
};
const buttonStyle = {
  float: "right"
};
export class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      title: "",
      description: "",
      latitude: "",
      longitude: "",
      submitAddress: this.props.submitAddress,
      category: "1",
      radius: "none",
      upVotes: 0,
      toggle: this.props.toggle,
      owner: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    addPin: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleChange(event) {
    this.setState({ category: event.target.value });
  }

  handleRadiusChange(event) {
    this.setState({ radius: event.target.value });
  }

  randomizePin(lat, lng) {
    const radius = this.state.radius;
    console.log(radius + " is the radius");
    let randomLat;
    let randomLng;
    let sign1 = Math.round(Math.random());
    let sign2 = Math.round(Math.random());
    if (radius == "min") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLat = Math.random() * (0.008 - 0.001) + 0.001 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.008 - 0.001) + 0.001);
      } else {
        randomLng = Math.random() * (0.008 - 0.001) + 0.001 + lng;
      }
    } else if (radius == "mod") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLat = Math.random() * (0.03 - 0.01) + 0.01 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.03 - 0.01) + 0.01);
      } else {
        randomLng = Math.random() * (0.03 - 0.01) + 0.01 + lng;
      }
    } else if (radius == "max") {
      if (sign1 == 0) {
        randomLat = lat - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLat = Math.random() * (0.1 - 0.05) + 0.05 + lat;
      }
      if (sign2 == 0) {
        randomLng = lng - (Math.random() * (0.1 - 0.05) + 0.05);
      } else {
        randomLng = Math.random() * (0.1 - 0.05) + 0.05 + lng;
      }
    } else {
      randomLat = lat;
      randomLng = lng;
    }
    this.state.latitude = randomLat;
    this.state.longitude = randomLng;
  }

  onSubmit = e => {
    const lat = this.props.userlat;
    const lng = this.props.userlng;
    e.preventDefault();
    this.state.latitude = lat;
    this.state.longitude = lng;
    this.state.owner = this.props.owner;
    this.randomizePin(lat, lng);

    const {
      title,
      description,
      latitude,
      longitude,
      category,
      upVotes,
      owner
    } = this.state;
    const pin = {
      title,
      description,
      latitude,
      longitude,
      category,
      upVotes,
      owner
    };
    this.props.addPin(pin);

    console.log(
      "title " +
        title +
        " description " +
        description +
        " latitude " +
        latitude +
        " longitude " +
        longitude +
        " category is " +
        category +
        " id: "
    );
    this.state.toggle();
  };

  render() {
    const { toggle, onSave } = this.props;

    // can probably condense this a lot
    // address functionality has not been implemented
    if (this.state.submitAddress == true) {
      return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={true}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}> Add a story </ModalHeader>
          {console.log(this.props.userlat + "pinform" + this.props.userlng)}

          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.address}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle} for="category">
                  Category
                </Label>
                <select
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <option value="1">Personal</option>
                  <option value="2">Community</option>
                  <option value="3">Historical</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle} for="radius">
                  Anonymity radius
                </Label>
                <select
                  value={this.state.radius}
                  onChange={this.handleRadiusChange}
                >
                  <option value="none">None</option>
                  <option value="min">Minimum</option>
                  <option value="mod">Moderate</option>
                  <option value="max">Maximum</option>
                </select>
              </FormGroup>
              <input
                type="hidden"
                name="latitude"
                onChange={this.onChange}
                value={this.latitude}
              />

              <input
                type="hidden"
                name="longitude"
                onChange={this.onChange}
                value={this.longitude}
              />
              <Button style={buttonStyle} color="success">
                Save
              </Button>
            </Form>
          </ModalBody>
          {/*<ModalFooter>*/}

          {/*</ModalFooter>*/}
        </Modal>
      );
    } else {
      return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={true}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}> Add a story </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle} for="category">
                  Category
                </Label>
                <select
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <option value="1">Personal</option>
                  <option value="2">Community</option>
                  <option value="3">Historical</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle} for="radius">
                  Anonymity radius
                </Label>
                <select
                  value={this.state.radius}
                  onChange={this.handleRadiusChange}
                >
                  <option value="none">None</option>
                  <option value="min">Minimum</option>
                  <option value="mod">Moderate</option>
                  <option value="max">Maximum</option>
                </select>
              </FormGroup>
              <input
                type="hidden"
                name="latitude"
                onChange={this.onChange}
                value={this.latitude}
              />

              <input
                type="hidden"
                name="longitude"
                onChange={this.onChange}
                value={this.longitude}
              />
              <Button style={buttonStyle} color="success">
                Save
              </Button>
            </Form>
          </ModalBody>
          {/*<ModalFooter>*/}
          {/* */}
          {/*</ModalFooter>*/}
        </Modal>
      );
    }
  }
}
export default connect(null, { addPin })(CustomModal);
