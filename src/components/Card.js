import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

// Custom Components
import Button from "./Button";
import EditTaskForm from "./Forms/EditTaskForm";

// Context
import { TaskActionContext } from "../context/TaskContext";

const Card = (props) => {
  const { id, title , content} = props.task;
  const { index, columnid } = props;
  const [form, setForm] = useState(false);
  const { DeleteTask} = useContext(TaskActionContext);
 

  const handleDelete = () => {
    DeleteTask(id, columnid);
  };

  return (
    <div>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided,snapshot) => (
          <div
            className="task-card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h6>{title}</h6>
            <p>{content}</p>
            <div className="icons">
            <FiEdit className="icon" onClick={() => setForm(true)} label="Edit" />
            <AiOutlineDelete className="icon" onClick={() => handleDelete()} label="Delete" />
            </div>
            </div>
        )}
      </Draggable>
      <EditTaskForm
        columnid={columnid}
        task={props.task}
        show={form}
        onHide={() => setForm(false)}
      />
    </div>
  );
};

export default Card;
