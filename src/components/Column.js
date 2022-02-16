import React, { useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// Custom Components
import Button from "./Button";
import Card from "./Card";
import EditColumnForm from "./Forms/EditColumnForm";
import AddTaskForm from "./Forms/AddTaskForm";

// Context
import { ColumnActionContext } from "../context/ColumnContext";
import { TaskContext } from "../context/TaskContext";

const Column = (props) => {
  const { id, columnTitle, taskIds } = props.column;
  const [cform, setCForm] = useState(false);
  const [aform, setAForm] = useState(false);
  const { tasks } = useContext(TaskContext);
  const { DeleteColumn } = useContext(ColumnActionContext);

  const handleDelete = () => {
    DeleteColumn(id);
  };

  return (
    <div
      className="column col-sm-11 col-md-5 col-lg-3"
      // style={{ height: taskIds.length > 4 ? "auto" : "500px" }}
    >
      <header className="column-header">
        <div>
          <h2>{columnTitle}</h2>
        </div>
        <div className="icons">
          <FiEdit
            size={17}
            className="icon"
            label="Edit"
            onClick={() => setCForm(true)}
          />
          <AiOutlineDelete
            size={17}
            className="icon"
            label="Delete"
            onClick={() => handleDelete()}
          />
        </div>
      </header>
      <div className="button-con">
        <Button label="Add Task" onClick={() => setAForm(true)} />
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskIds ? (
              taskIds.map((taskId) =>
                tasks.map((task, index) =>
                  task.id === taskId ? (
                    <Card
                      key={task.id}
                      columnid={id}
                      task={task}
                      index={index}
                    />
                  ) : (
                    <></>
                  )
                )
              )
            ) : (
              <></>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <EditColumnForm
        column={props.column}
        show={cform}
        onHide={() => setCForm(false)}
      />
      <AddTaskForm columnid={id} show={aform} onHide={() => setAForm(false)} />
    </div>
  );
};

export default Column;
