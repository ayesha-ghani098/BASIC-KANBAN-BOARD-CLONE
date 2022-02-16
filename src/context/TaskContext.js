import React, { createContext, useContext, useState } from "react";
import { Tasks } from "../staticData/data";

import { ColumnActionContext, ColumnContext } from "./ColumnContext";

export const TaskContext = createContext();
export const TaskActionContext = createContext();

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState(Tasks);
  const { columns } = useContext(ColumnContext);
  const { setColumns } = useContext(ColumnActionContext);

  // Add Task
  const AddTask = (Obj, ColumnId) => {
    let index = columns.findIndex((column) => column.id === ColumnId);
    columns[index].taskIds.push(Obj.id);
    setTasks([...tasks, Obj]);
  };

  // Edit Task
  const EditTask = (TaskId, Title, Content) => {
    const newState = tasks.map((task) => {
      if (TaskId === task.id) {
        task.id = TaskId;
        task.title = Title;
        task.content = Content;
      }
      return task;
    });

    setTasks(newState);
  };

  const DeleteTask = (TaskId, ColumnId) => {
    const newState = columns.map((column) => {
      if (ColumnId === column.id) {
        let newTaskIds = column.taskIds.filter((id) => {
          return id !== TaskId;
        });
        column.taskIds = newTaskIds;
        let newTasks = tasks.filter((task) => {
          return task.id !== TaskId;
        });
        setTasks(newTasks);
        return column;
      }
      return column;
    });
    setColumns(newState);
  };

  return (
    <TaskContext.Provider value={{ tasks }}>
      <TaskActionContext.Provider
        value={{ EditTask, AddTask, DeleteTask, setTasks }}
      >
        {props.children}
      </TaskActionContext.Provider>
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
