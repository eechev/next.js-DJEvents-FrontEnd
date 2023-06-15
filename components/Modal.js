import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleOnClose = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modelContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleOnClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return isBrowser
    ? ReactDOM.createPortal(modelContent, document.getElementById("modal-root"))
    : null;
}
