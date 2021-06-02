import React, { FC, useEffect, useRef } from "react";
import styles from "./Critic.module.scss";
import Critic from "./Critic";
import { Button } from "react-bootstrap";
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
          <Button
            onClick={onClose}
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
          </Button>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
