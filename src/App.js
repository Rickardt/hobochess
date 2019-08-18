import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "./components/Box/Box";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <Board size={10} />
    </div>
  );
}

export default App;
