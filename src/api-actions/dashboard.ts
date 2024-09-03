import axiosInstance from "src/utils/axios";
import endpoints from "src/utils/endpoints";

import { IEvent } from "src/interfaces/events";

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    const { data } = await axiosInstance.get(endpoints.events.root);

    return data.data as IEvent[];
  } catch (error) {
    console.error(error);
    return error;
  }
};
