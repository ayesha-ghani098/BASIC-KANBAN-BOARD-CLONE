import React, { Fragment, useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

// Custom Components
import Button from "../components/Button";
import Column from "../components/Column";
import AddColumnForm from "../components/Forms/AddColumnForm";

// Context
import { ColumnActionContext, ColumnContext } from "../context/ColumnContext";
import { TaskActionContext, TaskContext } from "../context/TaskContext";

const Board = () => {
  const [form, setForm] = useState(false);
  const { columns } = useContext(ColumnContext);
  const  { setColumns} = useContext(ColumnActionContext);
  const{tasks} = useContext(TaskContext)
  const{setTasks} = useContext(TaskActionContext)



  const onDragEnd = (result) => {
    console.log("Result",result);
  const {destination,source,draggableId} = result;

 if(!destination)console.log("No Destination");
 else if(destination.droppableId === source.droppableId && destination.index === source.index)console.log("Same");

let start = columns.filter(column=>column.id===source.droppableId)[0];
let finish = columns.filter(column=>column.id===destination.droppableId)[0];

if (start === finish){
  const newTaskIds = Array.from(start.taskIds);
  newTaskIds.splice(source.index,1);
  newTaskIds.splice(destination.index,0,draggableId);

//   let index = columns.findIndex((column) => column.id === start.id);
// let Columns = [...columns];
// Columns[index] = {...Columns[index],taskIds: newTaskIds};
// setColumns(Columns);
}
 
 



}

  return (
    <Fragment>
      <header className="header">
        <h3>Kanban Board Clone</h3>
        <Button label="Add New Column" onClick={() => setForm(true)} />
      </header>
      <div className="container">
        <div className="row">
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {columns ? (
              columns.map((data, index) => {
                return <Column column={data} key={index} prefix={index} />;
              })
            ) : (
              <></>
            )}
          </DragDropContext>
        </div>
        <div></div>
      </div>
      <AddColumnForm show={form} onHide={() => setForm(false)} />
    </Fragment>
  );
};

export default Board;
