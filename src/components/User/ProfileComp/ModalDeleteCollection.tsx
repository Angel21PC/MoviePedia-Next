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
export interface ModalDeleteCollectionProps {
  id: any;
  pilo: any;
}

const ModalDeleteCollection: FC<ModalDeleteCollectionProps> = ({
  id,
  pilo,
}) => {
  const [show, setShow] = useState(false);
  const { removeCollection } = useAuth();
  const removeCol = () => {
    handleClose();
    removeCollection(id);
    pilo();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalTitle></ModalTitle>
        <ModalBody>Are you sure ?</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={removeCol}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalDeleteCollection;
