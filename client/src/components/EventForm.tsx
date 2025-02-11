import React, { useState } from "react";

const EventForm: React.FC = () => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  // ✅ Function to fetch events from Wikipedia API
  const fetchEvents = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!month || !day) {
      setError("Please enter a valid month and day.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      setError("Error fetching events. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Find Historical Events</h2>
      
      <form onSubmit={fetchEvents} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border px-3 py-2 w-full rounded-lg"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border px-3 py-2 w-full rounded-lg"
            min="1"
            max="31"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Fetch Events
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-3">{error}</p>}

      {/* ✅ Display Events */}
      {events.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Events on {month}/{day}:</h3>
          <div className="mt-3 grid gap-4">
            {events.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <p className="font-bold">{event.year}:</p>
                <p>{event.text}</p>
                {event.pages?.length > 0 && (
                  <a
                    href={event.pages[0].content_urls.desktop.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-1"
                  >
                    Read More
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;
