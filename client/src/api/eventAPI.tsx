// client/src/api/eventAPI.ts
export const fetchEventsByDate = async (month: number, day: number) => {
    // Adjust the URL to match your backend route for events by month/day
    const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  };
  
  export const createEvent = async (eventData: {
    eventText: String;
    eventDate: Date;
    eventLink?: String;
  }) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch('https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Attach token to access protected route
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  };
  