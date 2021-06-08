import React, { FC, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Button,
} from "react-bootstrap";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface ModalDeleteAccountProps {
  pilo: any;
}

const ModalDeleteAccount: FC<ModalDeleteAccountProps> = ({ pilo }) => {
  const [show, setShow] = useState(false);
  const { deleteAccount } = useAuth();
  const removeCol = () => {
    handleClose();
    deleteAccount();
    pilo();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" className="w-100 mt-4" onClick={handleShow}>
        Delete Account
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalTitle></ModalTitle>
        <ModalBody>Warning!! Are you sure abaut this ?</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={removeCol}>
            Bye
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalDeleteAccount;
