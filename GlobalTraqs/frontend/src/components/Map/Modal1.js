// displays Modal pop up
// handles form submission when user clicks on the map to select a pin drop point

import React, { Component } from "react";
import PropTypes from "prop-types";
import { addPin } from "../../actions/pins";
import DatePicker from "react-datepicker";
import TinyMCE from 'react-tinymce';


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
import InputGroup from "react-bootstrap/InputGroup";

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
      owner: "",
      startDate: new Date(),
      endDate: new Date(),
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

  handleEditorChange = (e) => {
      this.setState({description: e.target.getContent()});
      console.log(
        'Content was updated:',
        e.target.getContent()
      );
  };


  handleRadiusChange(event) {
    this.setState({ radius: event.target.value });
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

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
      owner,
      startDate,
      endDate
    } = this.state;

    const pin = {
      title,
      description,
      latitude,
      longitude,
      category,
      upVotes,
      owner,
      startDate,
      endDate
    };

    this.props.addPin(pin);
    this.props.map.flyTo([this.state.latitude, this.state.longitude], 15);

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
        "start date " + startDate +
        "end date " + endDate
    );
    this.state.toggle();
  };

  render() {
    const { toggle, onSave } = this.props;

    // can probably condense this a lot
    // address functionality has not been implemented
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
                 <TinyMCE
                  content={this.state.description}
                  config={{
                    height: 300,
                    fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                  }}
                  onChange={this.handleEditorChange}
                />
                {/*<Label for="description">Description</Label>*/}
                {/*<Input*/}
                {/*  className="form-control"*/}
                {/*  type="textarea"*/}
                {/*  rows="5"*/}
                {/*  name="description"*/}
                {/*  onChange={this.onChange}*/}
                {/*  value={this.state.description}*/}
                {/*/>*/}
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
              <InputGroup>
                <Label style={labelStyle} for="startDate">
                  Start Date
                </Label>
                 <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                  />
                <Label style={labelStyle} for="endDate">
                  &nbsp;&nbsp;&nbsp;End Date
                </Label>
                 <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                  />
              </InputGroup>

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
export default connect(null, { addPin })(CustomModal);
