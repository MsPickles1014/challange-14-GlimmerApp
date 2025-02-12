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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-[#e0c9a6] shadow-2xl rounded-lg border-4 border-[#5a3e2b] font-serif">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-[#5a3e2b] border-b-2 border-[#5a3e2b] pb-2">
        📜 Find Historical Events 📜
      </h2>

      {/* Form Input */}
      <form onSubmit={fetchEvents} className="flex flex-col gap-4 mt-4">
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border-2 border-[#5a3e2b] px-3 py-2 w-full rounded-lg bg-[#f8f1e4] text-[#5a3e2b] shadow-inner"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border-2 border-[#5a3e2b] px-3 py-2 w-full rounded-lg bg-[#f8f1e4] text-[#5a3e2b] shadow-inner"
            min="1"
            max="31"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#8b5a2b] text-white py-2 rounded-lg shadow-md hover:bg-[#6d4321] transition"
        >
          Discover Events
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}

      {/* ✅ Display Events */}
      {events.length > 0 && (
        <div className="mt-6 p-4 bg-[#f8f1e4] border-2 border-[#5a3e2b] rounded-lg shadow-inner">
          <h3 className="text-xl font-bold text-[#5a3e2b] border-b border-[#5a3e2b] pb-2">
            Events on {month}/{day}:
          </h3>
          <div className="mt-3 max-h-[50vh] overflow-y-auto p-2">
            {events.map((event, index) => (
              <div
                key={index}
                className="p-4 border-b border-[#5a3e2b] last:border-none"
              >
                <p className="font-bold text-[#5a3e2b]">{event.year}:</p>
                <p className="text-[#5a3e2b]">{event.text}</p>
                {event.pages?.length > 0 && (
                  <a
                    href={event.pages[0].content_urls.desktop.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline block mt-1"
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
