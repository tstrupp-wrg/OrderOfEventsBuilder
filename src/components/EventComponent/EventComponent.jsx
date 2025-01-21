import React from "react";
import styles from "./EventComponent.module.css";
import Input from "../Input/Input";
import DurationPicker from "../DurationPicker/DurationPicker";
import TimePicker from "../TimePicker/TimePicker";
import LocalStartTime from "../LocalStartTime/LocalStartTime";

export default function EventComponent({
  index,
  prev,
  data,
  items,
  timezone,
  onDragStart,
  onDragOver,
  onDrop,
  onChange,
}) {
  return (
    <tr
      className={styles.container}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <td>{index + 1}</td>
      <td>
        <Input value={data.title} />
      </td>
      <td>
        <LocalStartTime
          items={items}
          prev={prev}
          data={data}
          timezone={timezone}
        />
      </td>
      <td>
        <DurationPicker value={data.duration} onChange={onChange} />
      </td>
    </tr>
  );
}
