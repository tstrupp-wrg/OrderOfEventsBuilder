import { useApi } from "./api/useApi";
import { useState, useEffect } from "react";
import { useWebSocket } from "./context/WebSocketContext";
import EventComponent from "./components/EventComponent/EventComponent";
import styles from "./App.module.css";

function App() {
  const socket = useWebSocket();
  const { fetch: fetchApi } = useApi();
  const [eventComponents, setEventComponents] = useState([]);
  const [timezone, setTimezone] = useState("America/New_York");

  // Fetch Order of Events
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchApi("/order_of_events/4537315");
      setEventComponents(response);
    };
    fetchData();
  }, [socket]);

  // Keep event_order in sync with index
  useEffect(() => {
    setEventComponents((prevEvents) =>
      prevEvents.map((event, index) => ({
        ...event,
        event_order: index + 1, // Ensure event_order matches index + 1
      }))
    );
  }, [eventComponents.length]); // Only re-run when list length changes

  // Convert UTC to Local Time
  function formatLocalTime(utcDateTime) {
    const date = new Date(utcDateTime + "Z"); // Ensure proper UTC parsing
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timezone, // Apply the fetched timezone
    }).format(date);
  }

  // Handle name change
  function handleChangeName(value, index) {
    setEventComponents((currentValues) =>
      currentValues.map((event, i) =>
        i === index ? { ...event, title: value } : event
      )
    );
  }

  // Handle first event start time change
  function handleChangeStartTime(value) {
    const updatedEvents = [...eventComponents];
    updatedEvents[0].start_date_time = value;
    setEventComponents(recalculateStartTimes(updatedEvents));
  }

  // Handle duration change
  function handleChangeDuration(value, index) {
    const updatedEvents = [...eventComponents];
    updatedEvents[index].duration = value;
    setEventComponents(recalculateStartTimes(updatedEvents));
  }

  // Recalculate subsequent start times
  function recalculateStartTimes(events) {
    let updatedEvents = [...events];

    for (let i = 1; i < updatedEvents.length; i++) {
      const prevEvent = updatedEvents[i - 1];
      const prevStartTime = new Date(prevEvent.start_date_time + "Z");

      // Extract hours and minutes from duration and add to the previous event's start time
      const [hours, minutes] = prevEvent.duration.split(":").map(Number);

      // Create a new date object to avoid mutation issues
      const newStartTime = new Date(prevStartTime);
      newStartTime.setHours(prevStartTime.getHours() + hours);
      newStartTime.setMinutes(prevStartTime.getMinutes() + minutes);

      updatedEvents[i] = {
        ...updatedEvents[i],
        start_date_time: newStartTime
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      };
    }

    return updatedEvents;
  }

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <h3>1/23/25 - Sunshine Nationals - Order of Events</h3>
        <div>
          <button>Add Event</button>
          <button onClick={() => console.log(eventComponents)}>Publish</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Event</th>
            <th>Start Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {eventComponents.map((event, index) => (
            <EventComponent
              key={event.event_component_ID}
              index={index}
              data={event}
              formatLocalTime={formatLocalTime}
              onChangeStartTime={index === 0 ? handleChangeStartTime : null}
              onChangeDuration={handleChangeDuration}
              onChangeName={handleChangeName}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
