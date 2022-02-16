import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

// Context
import { TaskActionContext } from "../../context/TaskContext";

const EditTaskForm = (props) => {
  const { content, id, title } = props.task;
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const { EditTask } = useContext(TaskActionContext);

  const handleSubmit = () => {
    EditTask(id, editedTitle, editedContent, props.columnid);
    props.onHide();
    setEditedContent("");
    setEditedTitle("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={editedTitle}
          placeholder="Title"
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <input
          value={editedContent}
          placeholder="Description"
          onChange={(e) => setEditedContent(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
        <button onClick={() => handleSubmit()}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskForm;
