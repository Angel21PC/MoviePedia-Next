import React, { FC, useState } from "react";
//firebase
import { useAuth } from "../../../../firebase/AuthContext";

//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Switch from "../../../util/Switch";
export interface ButtonsEditProps {
  id: string | number;
}

const ButtonsEdit: FC<ButtonsEditProps> = ({ id }) => {
  const { deleteCollection } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AwesomeButton
        type="primary"
        onPress={() => {
          deleteCollection(id);
        }}
      >
        Delete
      </AwesomeButton>
      <AwesomeButton>Edit</AwesomeButton>
      <Switch isOn={isOpen} handleToggle={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default ButtonsEdit;
