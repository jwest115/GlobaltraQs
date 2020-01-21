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
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
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
          <Form onSubmit={props.handleSubmit(props.onSubmit)}>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select name="category" ref={props.register}>
                <option value="1">Personal</option>
                <option value="2">Community</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              {/*    <Input
                className="form-control"
                type="text"
                name="title"
                ref={props.register}
              /> */}
              <Controller
                as={<Input />}
                className="form-control"
                type="text"
                name="title"
                defaultValue=""
                control={props.control}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              {/* <Input
                className="form-control"
                type="textarea"
                rows="5"
                name="description"
              /> */}
              <Controller
                as={<Input />}
                className="form-control"
                type="textarea"
                rows="5"
                name="description"
                defaultValue=""
                control={props.control}
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="radius">
                Anonymity radius
              </Label>
              <select name="anonradius" ref={props.register}>
                <option value="1">None</option>
                <option value="2">Minimum</option>
                <option value="3">Moderate</option>
                <option value="4">Maximum</option>
              </select>
            </FormGroup>
            <InputGroup>
              <Label style={labelStyle} for="startDate">
                Start Date
              </Label>

              <Controller
                isClear
                as={<DatePicker />}
                name="start"
                control={props.control}
                onChange={date => props.setStartDate(date)}
                defaultValue={props.startDate}
              />
              <Label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </Label>
              <DatePicker
                name="enddate"
                selected={props.enddate}
                onChange={date => props.setendDate(date)}
              />
            </InputGroup>
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
