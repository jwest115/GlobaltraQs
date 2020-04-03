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
import TinyMCE from 'react-tinymce';

import "react-datepicker/dist/react-datepicker.css";
const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};
function ModalEditPinForm(props) {
  const validateEditForm = (e) => {
      e.preventDefault();
      console.log("validating edit pin...");
      if(props.userForm.title && props.userForm.description) {
          props.onSubmit();
      }
  };
  return (
    <>
      {" "}
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a story </ModalHeader>
        <ModalBody>
          <Form onSubmit={validateEditForm}>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={props.userForm.category}
                onChange={e =>
                  props.setuserForm({
                    ...props.userForm,
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
              {!props.userForm.title ? ( <p className="text-danger">*Please enter a story title</p> ) : null }
              <Input
                className="form-control"
                type="text"
                name="title"
                value={props.userForm.title}
                onChange={e =>
                  props.setuserForm({
                    ...props.userForm,
                    title: e.target.value
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description
              {!props.userForm.description ? ( <p className="text-danger">*Please enter a story description</p> ) : null }
              </Label>
              <TinyMCE
                  content={props.userForm.description}
                  config={{
                    height: 300,
                    fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic'
                  }}
                  onChange={e =>
                  props.setuserForm({
                    ...props.userForm,
                    description: e.target.getContent()
                  })}
                />
              {/*<Input*/}
              {/*  className="form-control"*/}
              {/*  type="textarea"*/}
              {/*  rows="5"*/}
              {/*  name="description"*/}
              {/*  value={props.userForm.description}*/}
              {/*  onChange={e =>*/}
              {/*    props.setuserForm({*/}
              {/*      ...props.userForm,*/}
              {/*      description: e.target.value*/}
              {/*    })*/}
              {/*  }*/}
              {/*/>*/}
            </FormGroup>
          {/*    <InputGroup>*/}
          {/*    <label style={labelStyle} for="startDate">*/}
          {/*      Start Date*/}
          {/*    </label>*/}
          {/*     <DatePicker*/}
          {/*        selected={startDate}*/}
          {/*        onChange={this.handleStartDateChange}*/}
          {/*        value={startDate}*/}
          {/*      />*/}
          {/*    <label style={labelStyle} for="endDate">*/}
          {/*      &nbsp;&nbsp;&nbsp;End Date*/}
          {/*    </label>*/}
          {/*     <DatePicker*/}
          {/*        selected={endDate}*/}
          {/*        onChange={this.handleEndDateChange}*/}
          {/*        value={endDate}*/}
          {/*      />*/}
          {/*</InputGroup>*/}

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

export default ModalEditPinForm;
