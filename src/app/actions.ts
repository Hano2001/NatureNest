"use server";

import { addNewLocation, getAllLocations, getSingleLocation } from "@/queries";
import { PostLocation } from "./types";

export const getAllLocationsAction = async () => {
  const result = await getAllLocations();
  return result;
};

export const postLocationAction = async (data: PostLocation) => {
  await addNewLocation(data);
};

export const getSingleLocationAction = async (id: string) => {
  const result = await getSingleLocation(id);
  console.log(result);
  return result;
};
