import React from "react";
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
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};
function ModalPinForm(props) {
  console.log(props);
  return (
    <>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a story </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select value={props.category} onChange={props.handleChange}>
                <option value="1">Personal</option>
                <option value="2">Community</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input className="form-control" type="text" name="title" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                className="form-control"
                type="textarea"
                rows="5"
                name="description"
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="radius">
                Anonymity radius
              </Label>
              <select>
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
              <DatePicker />
              <Label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </Label>
              <DatePicker />
            </InputGroup>

            <input type="hidden" name="latitude" />

            <input type="hidden" name="longitude" />
            <Button style={buttonStyle} color="success">
              Save
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalPinForm;
