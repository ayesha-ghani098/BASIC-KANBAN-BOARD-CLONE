import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

// Context
import { ColumnActionContext } from "../../context/ColumnContext";

const EditColumnForm = (props) => {
  const { id, columnTitle, tasks } = props.column;
  const [editedTitle, setEditedTitle] = useState("");
  const { EditColumn } = useContext(ColumnActionContext);

  const handleSubmit = () => {
    EditColumn(id, editedTitle, tasks);
    setEditedTitle("");
    props.onHide();
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
          Edit Column
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={editedTitle}
          placeholder="Title"
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
        <button onClick={() => handleSubmit()}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditColumnForm;
