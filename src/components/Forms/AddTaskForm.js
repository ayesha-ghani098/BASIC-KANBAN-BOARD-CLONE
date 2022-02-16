import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

// Unique uid generator
import { v4 as uuidv4 } from "uuid";

// Context
import { TaskActionContext } from "../../context/TaskContext";

const AddTaskForm = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { AddTask } = useContext(TaskActionContext);

  const handleSubmit = () => {
    let Id = uuidv4();
    let obj = {
      id: Id,
      title: title,
      content: content,
    };
    AddTask(obj, props.columnid);
    props.onHide();
    setTitle("");
    setContent("");
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
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={content}
          placeholder="Description"
          onChange={(e) => setContent(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
        <button onClick={() => handleSubmit()}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskForm;
