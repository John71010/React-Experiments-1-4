import React, {
  useState,
  useMemo,
  useCallback,
} from "react";

import "./App.css";
import Calendar from "./Calendar";

function App() {

  const [search, setSearch] = useState("");

  const events = [
    {
      id: 1,
      title: "Instagram Post",
      date: "2026-08-05",
    },
    {
      id: 2,
      title: "LinkedIn Post",
      date: "2026-08-08",
    },
    {
      id: 3,
      title: "John Kalisto's Birthday",
      date: "2026-08-04",
    },
    {
      id: 4,
      title: "Facebook Campaign",
      date: "2026-08-12",
    },
  ];

  const filteredEvents = useMemo(() => {

    return events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  const handleEventClick = useCallback((event) => {

    alert(event.title);

  }, []);

  return (

    <div className="container">

      <h1>React Performance Optimization</h1>

      <input
        type="text"
        placeholder="Search Event..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Calendar
        events={filteredEvents}
        onEventClick={handleEventClick}
      />

    </div>

  );

}

export default App;