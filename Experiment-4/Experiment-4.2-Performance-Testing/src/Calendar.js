import React from "react";

const Calendar = React.memo(function Calendar({
  events,
  onEventClick,
}) {

  return (

    <div className="calendar">

      <h2>Post Calendar</h2>

      {events.map((event) => (

        <div
          key={event.id}
          className="event"
          onClick={() => onEventClick(event)}
        >
          <h3>{event.title}</h3>
          <p>{event.date}</p>
        </div>

      ))}

    </div>

  );

});

export default Calendar;