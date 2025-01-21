import React from "react";
import Modal from "../Modal/Modal";
import styles from "./AddEventModal.module.css";

export default function AddEventModal({ onClose }) {
  return (
    <Modal name={"Add Event"} onClose={onClose}>
      <input></input>
      <input type="time"></input>
      <p>Duration Picker</p>
      <button>Add</button>
    </Modal>
  );
}
