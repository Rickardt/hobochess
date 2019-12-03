import React from "react";
import "./Column.css";

function Column({ children, timeOut }) {
  return <div className="column">{children}</div>;
}

export default Column;
