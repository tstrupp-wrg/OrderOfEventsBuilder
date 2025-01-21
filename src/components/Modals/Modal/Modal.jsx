import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({ name, children, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // Start the closing animation
    setTimeout(() => {
      if (onClose) onClose(); // Notify parent to remove the modal after animation ends
    }, 200); // Match the duration of the `slide-out` animation (0.2s)
  };

  return (
    <div
      className={`${styles.container} ${
        isClosing ? styles.containerClosing : ""
      }`}
    >
      <div className={styles.header}>
        <h3>{name}</h3>
        <button className={styles.closeButton} onClick={handleClose}>
          <svg
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.closeIcon}
          >
            <path
              d="M14.5,1.5l-13,13m0-13,13,13"
              transform="translate(-1 -1)"
              stroke="white" /* Ensure the SVG path is visible */
              strokeWidth="2"
              fill="none"
            ></path>
          </svg>
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
