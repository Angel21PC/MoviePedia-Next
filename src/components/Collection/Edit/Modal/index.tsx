import React, { FC, useEffect, useRef } from "react";
import styles from "./ModalCollection.module.scss";
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
          <button
            onClick={onClose}
            className="btn btn-block create-account"
            style={{
              width: 60,
              height: 40,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            Close
          </button>
          {children}
        </div>
      </div>
      <style jsx>{`
        .create-account {
          border-radius: 20px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          background-color: #5791ff;
          border: none;
          color: white;
          margin: 1rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Modal;
