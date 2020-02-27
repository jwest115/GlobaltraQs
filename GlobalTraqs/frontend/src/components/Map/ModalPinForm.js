import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TinyMCE from "react-tinymce";

const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};
function ModalPinForm(props) {

  const validateAddPinForm = (e) => {
      e.preventDefault();
      console.log("validating add pin...");
      if(props.addPinValues.title && props.addPinValues.description) {
          props.handleAddPinSubmit();
      }
  };
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
          <Form onSubmit={validateAddPinForm}>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={props.addPinValues.category}

                onChange={e =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    category: e.target.value
                  })
                }
              >
                <option value="1">Personal</option>
                <option value="2">Community</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              {!props.addPinValues.title ? ( <p className="text-danger">*Please enter a story title</p> ) : null }
              <Input
                className="form-control"
                type="text"
                name="title"
                value={props.addPinValues.title}
                onChange={e =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    title: e.target.value
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description
                  {!props.addPinValues.description ? ( <p className="text-danger">*Please enter a story description</p> ) : null }
              </Label>
              <TinyMCE
                content={props.addPinValues.description}
                config={{
                  height: 300,
                  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                  plugins: "autolink link image lists print preview",
                  toolbar: "undo redo | bold italic"
                }}
                onChange={e =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    description: e.target.getContent()
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="radius">
                Anonymity radius
              </Label>
              <select
                name="anonradius"
                value={props.addPinValues.userRadius}
                onChange={e => props.setAnonRadius(e.target.value)}
              >
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

              <DatePicker
                isClearable
                todayButton="Today"
                name="startDate"
                selected={props.addPinValues.startDate}
                onChange={date =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    startDate: date
                  })
                }
              />
              <Label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </Label>
              <DatePicker
                isClearable
                todayButton="Today"
                name="endDate"
                selected={props.addPinValues.endDate}
                onChange={dat =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    endDate: dat
                  })
                }
              />
            </InputGroup>
            <Button style={buttonStyle} color="success">
              Save
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/*<Button color="primary" onClick={props.toggle}>*/}
          {/*  Do Something*/}
          {/*</Button>{" "}*/}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalPinForm;
