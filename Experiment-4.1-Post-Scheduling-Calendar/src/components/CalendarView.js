import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  {
    id: "1",
    title: "Instagram Post",
    date: "2026-08-05",
  },
  {
    id: "2",
    title: "LinkedIn Post",
    date: "2026-08-08",
  },
  {
    id: "3",
    title: "John Kalisto's Birthday",
    date: "2026-08-04",
  },
  {
    id: "4",
    title: "Facebook Campaign",
    date: "2026-08-12",
  },
];

function CalendarView() {

  const handleEventClick = (info) => {
    alert(
      "Selected Event: " + info.event.title
    );
  };

  const handleEventDrop = (info) => {
    alert(
      `${info.event.title} moved to ${info.event.start.toDateString()}`
    );
  };

  return (

    <FullCalendar

      plugins={[
        dayGridPlugin,
        interactionPlugin,
      ]}

      initialView="dayGridMonth"

      events={events}

      editable={true}

      selectable={true}

      eventClick={handleEventClick}

      eventDrop={handleEventDrop}

    />

  );

}

export default CalendarView;