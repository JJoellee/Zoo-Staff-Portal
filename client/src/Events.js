import { useState, useEffect } from 'react';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);
  const today = new Date();

  function renderEvents() {
    return events.map(event => (
      <div className="event" key={event.name + event.date + event.location}>
        <h3>{event.name}</h3>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p className="event-manager">Event Manager: {event.event_manager}</p>
        <p className={new Date(event.date) < today ? 'passed' : ''}>{new Date(event.date) < today ? 'This event has already passed' : 'This event is still upcoming'}</p>
        <button className={new Date(event.date) < today ? 'disabled' : ''}  disabled={new Date(event.date) < today}>Attend</button>
      </div>
    ));
  }

  return (
    <div className="events">
  <h2>Events</h2>
  {renderEvents()}
</div>
  );
}

export default Events;
