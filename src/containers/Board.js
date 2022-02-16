import React, { Fragment, useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";

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
  const { setColumns } = useContext(ColumnActionContext);
  const { tasks } = useContext(TaskContext);
  const { setTasks } = useContext(TaskActionContext);

  const onDragEnd = (result) => {
    const { destination, source, draggableId: item } = result;

    let movedItem = item.split("$")[1];

    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    const destinationIndex = destination.index;

    if (sourceId == destinationId) {
      handleSameColumn(result);
      return;
    }

    let tempData = [...columns];
    const destinationArray = tempData.find((item) => item.id === destinationId);
    const sourceArray = tempData.find((item) => item.id === sourceId);

    const destinationTasks = _.cloneDeep(destinationArray.taskIds);

    destinationTasks.splice(destinationIndex, 0, movedItem);
    destinationArray.taskIds = destinationTasks;

    const sourceTasks = sourceArray.taskIds.filter((item) => item != movedItem);
    sourceArray.taskIds = sourceTasks;

    const finalData = columns.map((item) => {
      if (item.id === destinationArray.id) {
        return destinationArray;
      } else if (item.id === sourceArray.id) {
        return sourceArray;
      }
      return item;
    });

    setColumns(finalData);
  };

  const handleSameColumn = (result) => {
    const { destination, source, draggableId: item } = result;

    let tempData = [...columns];

    let movedItem = item.split("$")[1];

    const sourceId = source.droppableId;
    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    if (destinationIndex === sourceIndex) {
      return;
    }

    const sourceArray = tempData.find((item) => item.id === sourceId);
    let clonedTasks = _.cloneDeep(sourceArray.taskIds);
    const sourceTasks = clonedTasks.filter((item) => item != movedItem);

    sourceTasks.splice(destinationIndex, 0, movedItem);
    sourceArray.taskIds = sourceTasks;

    const finalData = columns.map((item) => {
      if (item.id === sourceArray.id) {
        return sourceArray;
      }
      return item;
    });

    setColumns(finalData);
  };

  return (
    <Fragment>
      <header className="header">
        <h3>Kanban Board Clone</h3>
        <Button label="Add New Column" onClick={() => setForm(true)} />
      </header>
      <div className="container">
        <div className="row">
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {columns.map((data, index) => {
              return <Column column={data} key={index} />;
            })}
          </DragDropContext>
        </div>
        <div></div>
      </div>
      <AddColumnForm show={form} onHide={() => setForm(false)} />
    </Fragment>
  );
};

export default Board;
