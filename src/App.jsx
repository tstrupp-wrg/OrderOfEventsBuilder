import { useApi } from "./api/useApi";
import { useState, useEffect } from "react";
import { useWebSocket } from "./context/WebSocketContext";
import EventComponent from "./components/EventComponent/EventComponent";
import styles from "./App.module.css";
import AddEventModal from "./components/Modals/AddEventModal/AddEventModal";
import { DateTime } from "luxon";

function App() {
  const socket = useWebSocket();
  const { fetch: fetchApi } = useApi();
  const [eventComponents, setEventComponents] = useState([]);
  const [timezone, setTimezone] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Fetch Order of Events
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchApi("/order_of_events/4537315");
      setEventComponents(response);
    };
    fetchData();
  }, [socket]);

  // Fetch Timezone
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchApi("/timezone/4537315");
      setTimezone(response);
    };
    fetchData();
  }, [socket]);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("dragIndex", index);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, index) => {
    const dragIndex = parseInt(event.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === index) return;

    const newItems = [...eventComponents];
    const [movedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(index, 0, movedItem);

    setEventComponents(newItems);
  };
  const handleChange = (val, field, index) => {
    setEventComponents((prevEventComponents) => {
      return prevEventComponents.map((event, i) => {
        if (i < index) {
          return event; // Events before the changed one remain the same
        }

        let newDurationParts = event.duration.split(":").map(Number);
        newDurationParts[field] = val.padStart(2, "0");

        let updatedDuration = newDurationParts.join(":");

        if (i === index) {
          return { ...event, duration: updatedDuration }; // Update only selected event
        } else {
          // Recalculate start times for all following events
          const prevEvent = prevEventComponents[i - 1];
          const [prevHours, prevMinutes, prevSeconds] = prevEvent.duration
            .split(":")
            .map(Number);

          const newStartDateTime = DateTime.fromFormat(
            prevEvent.start_date_time,
            "yyyy-MM-dd HH:mm:ss",
            { zone: "utc" }
          )
            .plus({
              hours: prevHours,
              minutes: prevMinutes,
              seconds: prevSeconds,
            })
            .toFormat("yyyy-MM-dd HH:mm:ss");

          return { ...event, start_date_time: newStartDateTime };
        }
      });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <h3>1/23/25 - Sunshine Nationals - Order of Events</h3>
        <div>
          <button onClick={() => setShowAddEventModal(true)}>Add Event</button>
          <button>Update</button>
        </div>
      </div>
      <p>Timezone: {JSON.stringify(timezone)}</p>
      <table>
        <tr>
          <th>Order</th>
          <th>Event</th>
          <th>Start Time</th>
          <th>Duration</th>
        </tr>
        {eventComponents.map((item, index) => (
          <EventComponent
            items={eventComponents}
            key={item.id}
            index={index}
            data={item}
            prev={index > 0 ? eventComponents[index - 1] : null}
            timezone={timezone.java_timezone}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            onChange={(val, field) => handleChange(val, field, index)}
          />
        ))}
      </table>
      {showAddEventModal ? (
        <AddEventModal onClose={() => setShowAddEventModal(false)} />
      ) : null}
    </div>
  );
}

export default App;
