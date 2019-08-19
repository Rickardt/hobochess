import React, { useEffect, useState } from "react";
import { StateProvider } from "./state/state";
import logo from "./logo.svg";
import "./App.css";
import Box from "./components/Box/Box";
import Board from "./components/Board/Board";
import boardReducer, { initialState } from "./reducers/boardReducer";

function App() {
  return (
    <StateProvider initialState={initialState} reducer={boardReducer}>
      <div className="App">
        <Board size={10} />
      </div>
    </StateProvider>
  );
}

export default App;
