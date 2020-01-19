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
function ModalPinForm(props) {
  console.log(props);
  return (
    <>
      <h2>test</h2>
      <Button variant="primary" onClick={props.handleShow}>
        Launch demo modal
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={false}
        toggle={props.handleClose}
      >
        {" "}
        <ModalHeader toggle={props.handleClose}> Add a story </ModalHeader>
        <ModalBody>test deeez nuts</ModalBody>
      </Modal>
    </>
  );
}

export default ModalPinForm;
