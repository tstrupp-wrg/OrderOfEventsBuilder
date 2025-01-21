import React, { useEffect, useState } from "react";
import styles from "./DurationPicker.module.css";

export default function DurationPicker({ value, onChange }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  useEffect(() => {
    const [h, m] = value.split(":");
    setHours(h);
    setMinutes(m);
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.time_selector_container}>
        <input
          className={styles.input}
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) => onChange(e.target.value, 0)}
        />
        <p className={styles.legend}>Hours</p>
      </div>
      <div className={styles.time_selector_container}>
        <input
          className={styles.input}
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => onChange(e.target.value, 1)}
        />
        <p className={styles.legend}>Minutes</p>
      </div>
    </div>
  );
}
