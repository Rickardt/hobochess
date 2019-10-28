import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withRouter } from "react-router-dom";
import { sleep } from "../../util/functions";

import "./Background.css";

const Background = ({ children, onExit, location }) => {
  const [mounted, setMounted] = useState(false);
  const [depth, setDepth] = useState();
  function getPathDepth(location) {
    return (location || {}).pathname.split("/").length;
  }
  function updateDepth() {
    setDepth(getPathDepth(location));
  }
  useEffect(() => {
    setMounted(true);
    return function() {
      setMounted(false);
    };
  }, [updateDepth]);
  return (
    <TransitionGroup className="transition-group-container">
      <CSSTransition
        key={location.key}
        timeout={{
          enter: 6000,
          exit: 0
        }}
        classNames={
          "alert"
          //getPathDepth(location) - depth ? "slide-left" : "slide-right"
        }
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
export default Background;
