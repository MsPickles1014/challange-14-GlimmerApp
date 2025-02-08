import { User, Event } from './models'; // Import the models
import sequelize from './config/connection';

const testAssociations = async () => {
  try {
    // Create a user
    const user = await User.create({
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'password',
    });

    // Create events associated with the user
    const event1 = await Event.create({
      userId: user.id,
      eventText: 'Some event happened!',
      eventDate: '2025-02-08',
      eventLink: 'https://example.com',
    });

    const event2 = await Event.create({
      userId: user.id,
      eventText: 'Another event happened!',
      eventDate: '2025-02-09',
      eventLink: 'https://example.com',
    });

    // Fetch the event and include the user
    const foundEvent = await Event.findOne({
      where: { id: event1.id },
      include: User, // Include the associated user
    });

    console.log(`Event: ${foundEvent?.eventText}`);
    console.log(`Associated User: ${foundEvent?.user?.username}`); // Should log the username of the associated user

    // Test if the second event is linked to the user
    const foundEvents = await user.getEvents(); // This should return all events associated with this user
    console.log('User\'s events:', foundEvents.map(event => event.eventText));
  } catch (error) {
    console.error('Error testing associations:', error);
  } finally {
    // Close the connection to the database
    sequelize.close();
  }
};

testAssociations();
