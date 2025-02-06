import { useState } from "react";
import { getHistoricalEvents } from "../services/eventService";

const Events = () => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    if (!month || !day) {
      setError("Please select a valid date.");
      return;
    }
    
    try {
      const response = await getHistoricalEvents(month, day);
      setEvents(response.data.events);
      setError("");
    } catch (err) {
      setError("Failed to fetch events.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Discover Historical Events</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="1"
          max="12"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          max="31"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={fetchEvents} className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch Events
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="p-2 border-b">
              <h2 className="font-bold">{event.text}</h2>
              {event.pages?.[0]?.content_urls?.desktop?.page && (
                <a href={event.pages[0].content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Read more
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No events found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
