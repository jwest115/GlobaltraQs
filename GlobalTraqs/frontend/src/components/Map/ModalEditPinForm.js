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
const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};
function ModalEditPinForm(props) {
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
          <Form onSubmit={props.onSubmit}>
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
              <Label for="description">Description</Label>
              <Input
                className="form-control"
                type="textarea"
                rows="5"
                name="description"
                value={props.userForm.description}
                onChange={e =>
                  props.setuserForm({
                    ...props.userForm,
                    description: e.target.value
                  })
                }
              />
            </FormGroup>

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

export default ModalEditPinForm;
