import styles from "./EventComponent.module.css";
import DurationPicker from "../DurationPicker/DurationPicker";
import Input from "../Input/Input";

export default function EventComponent({
  index,
  data,
  formatLocalTime,
  onChangeStartTime,
  onChangeDuration,
  onChangeName,
}) {
  // Handle changes from DurationPicker
  const handleDurationChange = (value, type) => {
    let durationParts = data.duration.split(":").map(Number);
    if (type === 0) {
      durationParts[0] = value; // Update hours
    } else {
      durationParts[1] = value; // Update minutes
    }
    const newDuration = `${String(durationParts[0]).padStart(2, "0")}:${String(
      durationParts[1]
    ).padStart(2, "0")}`;
    onChangeDuration(newDuration, index);
  };

  return (
    <tr className={styles.container}>
      <td>{data.event_order}</td>
      <td>
        <Input
          value={data.title}
          onChange={(e) => onChangeName(e.target.value, index)}
        />
      </td>
      <td>
        <p>{formatLocalTime(data.start_date_time)}</p>
      </td>
      <td>
        <DurationPicker
          value={data.duration.slice(0, 5)}
          onChange={handleDurationChange}
        />
      </td>
    </tr>
  );
}
