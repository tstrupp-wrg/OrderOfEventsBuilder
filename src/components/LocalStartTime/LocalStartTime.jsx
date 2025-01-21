import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function LocalStartTime({ prev, data, timezone }) {
  let calculatedTime;

  if (prev) {
    const prevStart = DateTime.fromFormat(
      prev.start_date_time,
      "yyyy-MM-dd HH:mm:ss",
      { zone: "utc" }
    );

    const [hours, minutes, seconds] = prev.duration.split(":").map(Number);

    calculatedTime = prevStart
      .plus({ hours, minutes, seconds })
      .setZone(timezone)
      .toFormat("hh:mm a");
  } else {
    calculatedTime = DateTime.fromFormat(
      data.start_date_time,
      "yyyy-MM-dd HH:mm:ss",
      { zone: "utc" }
    )
      .setZone(timezone)
      .toFormat("hh:mm a");
  }

  return <div>{calculatedTime}</div>;
}
