import React, { FC } from "react";
import styles from "./Switch.module.scss";

export interface SwitchProps {
  isOn: boolean;
  handleToggle: any;
}

const Switch: FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.react_switch_checkbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className={styles.react_switch_label}
        htmlFor={`react-switch-new`}
      >
        <span className={styles.react_switch_button} />
      </label>
    </>
  );
};

export default Switch;
