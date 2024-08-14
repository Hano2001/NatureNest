"use server";

import { addNewLocation, getAllLocations } from "@/queries";
import { PostLocation } from "./types";

export const getAllLocationsAction = async () => {
  const result = await getAllLocations();
  return result;
};

export const postLocationAction = async (data: PostLocation) => {
  await addNewLocation(data);
};

export const getSingleLocationAction = async (id: string) => {
  return { id };
};
