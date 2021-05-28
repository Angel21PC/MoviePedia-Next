import React, { FC, useEffect, useState } from "react";
//firebase
import { useAuth } from "../../../../firebase/AuthContext";

//components
import { Button } from "react-bootstrap";
import Switch from "../../../util/Switch";
export interface ButtonsEditProps {
  id: string | number;
}

const ButtonsEdit: FC<ButtonsEditProps> = ({ id }) => {
  const { deleteCollection } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          deleteCollection(id);
        }}
      >
        Delete
      </Button>
      <Button>Edit</Button>
      <Switch isOn={isOpen} handleToggle={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default ButtonsEdit;
