import React from "react";

// Context
import ColumnContextProvider from "./ColumnContext";
import TaskContextProvider from "./TaskContext";

const ContextProvider = (props) => {
  return (
    <ColumnContextProvider>
      <TaskContextProvider>{props.children}</TaskContextProvider>
    </ColumnContextProvider>
  );
};
export default ContextProvider;
