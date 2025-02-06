import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState({ month: "", day: "" });

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${date.month}/${date.day}`
      );
      setEvents(res.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Find Historical Events on Your Birthday</h1>
      <input
        type="number"
        placeholder="Month (1-12)"
        value={date.month}
        onChange={(e) => setDate({ ...date, month: e.target.value })}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="Day (1-31)"
        value={date.day}
        onChange={(e) => setDate({ ...date, day: e.target.value })}
        className="border p-2 m-2"
      />
      <button onClick={fetchEvents} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      <ul className="mt-4">
        {events.map((event, index) => (
          <li key={index} className="border p-2 my-2">
            {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
