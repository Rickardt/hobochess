import React from "react";

function Column({ children, xCoordinate }) {
  return (
    <div>{React.cloneElement(children, { xCoordinate: `${xCoordinate}` })}</div>
  );
}

export default Column;
