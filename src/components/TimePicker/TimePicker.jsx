import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const TimePicker = ({ previousEvent, initialDateTime, presetTimezone }) => {
  // Convert the initial UTC datetime to the preset timezone
  const [localTime, setLocalTime] = useState("");
  const [calculatedTime, setCalculatedTime] = useState();

  useEffect(() => {
    if (previousEvent) {
      const prevStart = DateTime.fromFormat(
        previousEvent.start_date_time,
        "yyyy-MM-dd HH:mm:ss",
        { zone: "utc" }
      );

      // Parse the duration "HH:mm:ss" into hours, minutes, and seconds
      const [hours, minutes, seconds] = previousEvent.duration
        .split(":")
        .map(Number);

      // Add parsed duration to the previous start time
      const calculatedEndTime = prevStart
        .plus({ hours, minutes, seconds })
        .setZone(presetTimezone)
        .toFormat("hh:mm a"); // Convert to 12-hour AM/PM format

      setCalculatedTime(calculatedEndTime);
    }
  }, [previousEvent, presetTimezone, initialDateTime]);

  useEffect(() => {
    if (initialDateTime) {
      const localDateTime = DateTime.fromFormat(
        initialDateTime,
        "yyyy-MM-dd HH:mm:ss",
        { zone: "utc" }
      )
        .setZone(presetTimezone)
        .toFormat("hh:mm a"); // Convert to 12-hour AM/PM format
      setLocalTime(localDateTime);
    }
  }, [initialDateTime, presetTimezone]);

  const handleTimeChange = (e) => {
    setLocalTime(e.target.value);
  };

  const handleSubmit = () => {
    // Convert the input time back to UTC before submitting to the database
    const [time, period] = localTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Create a DateTime object in the preset timezone
    const adjustedDateTime = DateTime.fromObject(
      { hour: hours, minute: minutes },
      { zone: presetTimezone }
    );

    // Convert back to UTC and format it in MySQL-compatible format
    const utcDateTime = adjustedDateTime
      .setZone("utc")
      .toFormat("yyyy-MM-dd HH:mm:ss");

    console.log("Converted UTC Time for Database:", utcDateTime);
    // Submit `utcDateTime` to backend/database
  };

  return (
    <div>
      <p>Stored Time: {localTime}</p>
      <p>Calculated Time: {calculatedTime}</p>
      {/* <input
        type="text"
        value={localTime}
        onChange={handleTimeChange}
        placeholder="hh:mm AM/PM"
      /> */}
    </div>
  );
};

export default TimePicker;
