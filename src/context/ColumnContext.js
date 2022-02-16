import React, { createContext, useState } from "react";
import { Columns } from "../staticData/data";

// Creating Context
export const ColumnContext = createContext();
export const ColumnActionContext = createContext();

const ColumnContextProvider = (props) => {
  const [columns, setColumns] = useState(Columns);

  // Add Column Function
  const AddColumn = (Obj) => {
    setColumns([...columns, Obj]);
  };

  // Edit Column Function
  const EditColumn = (id, columnTitle, taskIds) => {
    let index = columns.findIndex((column) => column.id === id);
    let newColumns = [...columns];
    newColumns[index] = {
      ...newColumns[index],
      id: id,
      columnTitle: columnTitle,
      taskIds: taskIds,
    };
    setColumns(newColumns);
  };

  // Delete Column Function
  const DeleteColumn = (id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  return (
    <ColumnContext.Provider value={{ columns }}>
      <ColumnActionContext.Provider
        value={{ setColumns, AddColumn, EditColumn, DeleteColumn }}
      >
        {props.children}
      </ColumnActionContext.Provider>
    </ColumnContext.Provider>
  );
};

export default ColumnContextProvider;
