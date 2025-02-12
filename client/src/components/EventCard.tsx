import React from 'react';

interface EventProps {
  event: {
    id: number;
    eventText: string;
    eventDate: Date;
    eventLink?: string;
  };
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="bg-[#f8f1e4] shadow-lg p-4 rounded-lg border-2 border-[#5a3e2b] font-serif">
      {/* Event Text */}
      <p className="text-[#5a3e2b] font-semibold">{event.eventText}</p>

      {/* Event Date */}
      <p className="text-sm text-[#6b4f34] italic mt-2">
        {new Date(event.eventDate).toLocaleDateString()}
      </p>

      {/* Read More Link */}
      {event.eventLink && (
        <a
          href={event.eventLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8b5a2b] underline block mt-2 hover:text-[#6d4321] transition"
        >
          Read more 📖
        </a>
      )}
    </div>
  );
};

export default EventCard;
