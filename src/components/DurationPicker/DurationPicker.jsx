import React, { useEffect, useState } from "react";
import styles from "./DurationPicker.module.css";

export default function DurationPicker({ value, onChange }) {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  useEffect(() => {
    setHours(value.split(":")[0]);
    setMinutes(value.split(":")[1]);
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.time_selector_container}>
        <input
          className={styles.input}
          type="number"
          value={Number(hours)}
          onChange={(e) => onChange(e.target.value, 0)}
        />
        <p className={styles.legend}>Hours</p>
      </div>
      <div className={styles.time_selector_container}>
        <input
          className={styles.input}
          type="number"
          value={Number(minutes)}
          onChange={(e) => onChange(e.target.value, 1)}
        />
        <p className={styles.legend}>Minutes</p>
      </div>
    </div>
  );
}
