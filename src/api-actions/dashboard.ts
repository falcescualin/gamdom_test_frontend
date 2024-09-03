import { faker } from "@faker-js/faker";

import { IEvent } from "src/interfaces/events";

const matches = [
  {
    event_id: faker.string.uuid(),
    event_name: "Rapid vs FCSB",
    odds: { win: 2.0, draw: 3.5, lose: 3.8 },
  },
  {
    event_id: faker.string.uuid(),
    event_name: "Barcelona vs Real Madrid",
    odds: { win: 1.9, draw: 4.0, lose: 4.2 },
  },
  {
    event_id: faker.string.uuid(),
    event_name: "Manchester City vs Liverpool",
    odds: { win: 1.8, draw: 3.6, lose: 4.0 },
  },
  {
    event_id: faker.string.uuid(),
    event_name: "Juventus vs AC Milan",
    odds: { win: 2.1, draw: 3.4, lose: 3.6 },
  },
  {
    event_id: faker.string.uuid(),
    event_name: "PSG vs Lyon",
    odds: { win: 1.7, draw: 3.8, lose: 4.4 },
  },
];

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    // const { data } = await axiosInstance.get(endpoints.events.root);
    // return data as IEvent[];

    return matches;
  } catch (error) {
    console.error(error);
    return error;
  }
};
