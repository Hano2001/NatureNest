"use server";

import {
  addNewLocation,
  addUtils,
  deleteLocation,
  getAllLocations,
  getSingleLocation,
} from "@/queries";
import { PostLocation } from "./types";
import { revalidatePath } from "next/cache";

export const getAllLocationsAction = async () => {
  const result = await getAllLocations();
  return result;
};

export const postLocationAction = async (
  data: PostLocation,
  imageUrl: string,
) => {
  const location = {
    name: data.name,
    latitude: data.latitude,
    longitude: data.longitude,
    description: data.description,
    imageUrl: imageUrl,
  };
  const utils = data.utils;
  const locationId = await addNewLocation(location);
  if (locationId) {
    if (utils) {
      utils.forEach((util) => {
        addUtils(util, locationId);
      });
      return locationId;
    }
  } else {
    return false;
  }
};

export const getSingleLocationAction = async (id: string) => {
  const result = await getSingleLocation(id);
  return result;
};

export const deleteLocationAction = async (id: string) => {
  const result = await deleteLocation(id);
  return result;
};
