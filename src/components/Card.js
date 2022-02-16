import React, { cloneElement, useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// Custom Components
import EditTaskForm from "./Forms/EditTaskForm";

// Context
import { TaskActionContext, TaskContext } from "../context/TaskContext";

const Card = (props) => {
  const { task } = props;
  const { index, columnid } = props;
  const [form, setForm] = useState(false);
  const { DeleteTask } = useContext(TaskActionContext);
  const { tasks } = useContext(TaskContext);

  const filteredTask = tasks.filter((item) => item.id === task)[0];

  const handleDelete = () => {
    DeleteTask(task, columnid);
  };

  return (
    <div>
      <Draggable
        key={columnid + "$" + task}
        draggableId={columnid + "$" + task}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            key={index}
            className="task-card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h6>{filteredTask.title}</h6>
            <p>{filteredTask.content}</p>
            <div className="icons">
              <FiEdit
                className="icon"
                onClick={() => setForm(true)}
                label="Edit"
              />
              <AiOutlineDelete
                className="icon"
                onClick={() => handleDelete()}
                label="Delete"
              />
            </div>
          </div>
        )}
      </Draggable>
      <EditTaskForm
        columnid={columnid}
        task={filteredTask}
        show={form}
        onHide={() => setForm(false)}
      />
    </div>
  );
};

export default Card;
