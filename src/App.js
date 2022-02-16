import React from "react";

// Context
import ContextProvider from "./context/Context";

// Styles
import "./App.css";

// Custom Components
import Board from "./containers/Board";

const App = () => {
  return (
    <ContextProvider>
      <Board />
    </ContextProvider>
  );
};

export default App;
