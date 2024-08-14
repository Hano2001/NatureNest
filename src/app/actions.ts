"use server";

import {
  addNewLocation,
  addUtils,
  getAllLocations,
  getSingleLocation,
} from "@/queries";
import { PostLocation } from "./types";

export const getAllLocationsAction = async () => {
  const result = await getAllLocations();
  return result;
};

export const postLocationAction = async (data: PostLocation) => {
  const location = {
    name: data.name,
    latitude: data.latitude,
    longitude: data.longitude,
    description: data.description,
  };
  const utils = data.utils;
  const locationId = await addNewLocation(location);

  utils.forEach((util) => {
    addUtils(util, locationId);
  });
};

export const getSingleLocationAction = async (id: string) => {
  const result = await getSingleLocation(id);
  console.log(result);
  return result;
};
