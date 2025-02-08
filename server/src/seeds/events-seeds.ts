import { Event } from '../models/index.js';

export const seedEvents = async () => {
  await Event.bulkCreate(
    [
      {
        userId: 1,  // ✅ Required field
        eventText: 'Unknown perpetrators carried out a series of four bombings in Dnipropetrovsk, Ukraine.',
        eventDate: new Date('2002-10-11'), // ✅Use Date object***Noela Changes
        eventLink: 'https://en.wikipedia.org/wiki/Dnipro'
      },
      {
        userId: 2,  // ✅ Required field
        eventText: 'A bomb exploded in the Myyrmanni shopping center in Helsinki, Finland (aftermath pictured), resulting in 7 deaths and 159 injuries.',
        eventDate: new Date('2002-10-11'), // ✅Use Date object***Noela Changes
        eventLink: 'https://en.m.wikipedia.org/wiki/Myyrmanni'
      },
      {
        userId: 3,  // ✅ Required field
        eventText: 'An explosion on Deepwater Horizon, an offshore rig in the Gulf of Mexico, resulted in the largest marine oil spill in history.',
        eventDate: new Date('2010-04-20'), // ****Noela Changes
        eventLink: 'https://en.m.wikipedia.org/wiki/Deepwater_Horizon_explosion'
      }
    ],
    { individualHooks: true }
  );
};
