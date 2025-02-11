// client/src/components/EventCard.tsx
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
    <div className="bg-white shadow p-4 rounded">
      <p className="text-gray-800">{event.eventText}</p>
      <p className="text-sm text-gray-500">
        {new Date(event.eventDate).toLocaleDateString()}
      </p>
      {event.eventLink && (
        <a
          href={event.eventLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline block mt-2"
        >
          Read more
        </a>
      )}
    </div>
  );
};

export default EventCard;
