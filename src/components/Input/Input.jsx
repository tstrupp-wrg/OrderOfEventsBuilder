import styles from "./Input.module.css";

export default function Input({ value, onChange }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
