import React, { FC, useEffect, useRef } from "react";
import styles from "./Critic.module.scss";
import { Button } from "react-bootstrap";
//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} className={`${styles.modal__wrap}`}>
        <div className={styles.modal}>
          <AwesomeButton
            type="primary"
            onPress={onClose}
            style={{
              width: 60,
              height: 40,
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1rem",
            }}
            className={styles.close__btn}
          >
            Close
          </AwesomeButton>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
