import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import { logout } from "../../../util/authFunctions";
import { LOGIN_PAGE } from "../../../constants/routes";
import "./style.css";

const LogoutModal = ({ open, onClose, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const yasLogout = async () => {
    handleClose();
    await logout();
    history.push(LOGIN_PAGE);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      className="logout-modal"
    >
      <Card className="logout-modal">
        <h2>Are you sure you want to logout?</h2>
        <div>
          <Button button="primary" onClick={yasLogout}>
            Yas
          </Button>
          <Button button="primary" onClick={handleClose}>
            Nope
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default LogoutModal;
