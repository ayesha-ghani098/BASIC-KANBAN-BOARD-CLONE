import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

// Unique uid generator
import { v4 as uuidv4 } from "uuid";

// Context
import { ColumnActionContext } from "../../context/ColumnContext";

const AddColumnForm = (props) => {
  const [title, setTitle] = useState("");
  const { AddColumn } = useContext(ColumnActionContext);

  const handleSubmit = () => {
    let Id = uuidv4();
    let obj = {
      id: Id,
      columnTitle: title,
      taskIds: [],
    };
    AddColumn(obj);
    props.onHide();
    setTitle("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Column
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
        <button onClick={() => handleSubmit()}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddColumnForm;
