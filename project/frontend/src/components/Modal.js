// displays Modal pop up
// handles form submission when user clicks on the map to select a pip drop point

import React, { Component } from "react";
import PropTypes from 'prop-types'
import { addPin } from '../actions/pins'

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
  marginRight: '10px'
}
const buttonStyle = {
  float: 'right'
}
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
      category: "personal",
      toggle: this.props.toggle,
      refreshList: this.props.refreshList,
      data: this.props.data
    }


    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }

  static propTypes = {
    addPin: PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleChange(event) {
    this.setState({ category: event.target.value });
  }

  onSubmit = e => {
    const lat = this.props.userlat
    const lng = this.props.userlng
    e.preventDefault();
    this.state.latitude = lat
    this.state.longitude = lng
    const { title, description, latitude, longitude, category } = this.state
    const pin = { title, description, latitude, longitude, category };
    this.props.addPin(pin)

    // Call refreshList() to update the map with new pin
    // Sometimes this doesn't work --> can probably add the new input into the data [] instead
    this.state.refreshList()
    console.log("title " + title + " description " + description + " latitude " + ' ' + latitude + " longitude " + longitude + " category is " + category)
    this.state.toggle()
  }


  render() {
    const { toggle, onSave } = this.props;

    // can probably condense this a lot
    // address functionality has not been implemented
    if (this.state.submitAddress == true) {
      return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}> Add a story </ModalHeader>
          {console.log(this.props.userlat + 'pinform' + this.props.userlng)}

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
                <Label style={labelStyle} for="category">Category</Label>
                <select value={this.state.category} onChange={this.handleChange}>
                  <option value="personal">Personal</option>
                  <option value="community">Community</option>
                  <option value="historical">Historical</option>
                </select>
              </FormGroup>
              <input type="hidden" name="latitude" onChange={this.onChange}
                value={this.latitude} />

              <input type="hidden" name="longitude" onChange={this.onChange}
                value={this.longitude} />
              <Button style={buttonStyle} color="success">
                Save
                      </Button>
            </Form>

          </ModalBody>
          {/*<ModalFooter>*/}

          {/*</ModalFooter>*/}
        </Modal>
      );
    }
    else {
      return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered isOpen={true} toggle={toggle}>
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
                <Label style={labelStyle} for="category">Category</Label>
                <select value={this.state.category} onChange={this.handleChange}>
                  <option value="personal">Personal</option>
                  <option value="community">Community</option>
                  <option value="historical">Historical</option>
                </select>
              </FormGroup>
              <input type="hidden" name="latitude" onChange={this.onChange}
                value={this.latitude} />

              <input type="hidden" name="longitude" onChange={this.onChange}
                value={this.longitude} />
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
export default connect(null, { addPin })(CustomModal)

