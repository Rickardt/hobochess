import React from "react";
import Grow from "@material-ui/core/Grow";

function Column({ children, timeOut }) {
  return (
    <Grow
      in={true}
      style={{ transformOrigin: "0 0 0", width: "100px" }}
      {...{ timeout: timeOut }}
    >
      <div>{children}</div>
    </Grow>
  );
}

export default Column;
