"use server";

import { addNewLocation, getAllLocations } from "@/queries";
import { Location } from "./types";

const locations = [
  {
    latitude: "45.8054",
    longitude: "-74.1241",
    name: "1",
    utils: ["Bathroom", "Campfire"],
    description: "Something",
  },
  {
    latitude: "34.8054",
    longitude: "-74.5241",
    name: "2",
    utils: ["Bathroom", "Campfire"],
    description: "Something",
  },
  {
    latitude: "20.8054",
    longitude: "-70.0241",
    name: "3",
    utils: ["Bathroom", "Campfire"],
    description: "Something",
  },
  {
    latitude: "20.8054",
    longitude: "-74.0241",
    name: "4",
    utils: ["Bathroom", "Campfire"],
    description: "Something",
  },
  {
    latitude: "59.33258",
    longitude: "18.0649",
    name: "Stockholm",
    utils: ["Lake", "Parking"],
    description: "Capital of Sweden",
  },
  {
    latitude: "59.3372073",
    longitude: "18.0116906",
    name: "Salt",
    utils: ["Forest"],
    description: "We work here",
  },
];

export const getAllLocationsAction = async () => {
  const result = await getAllLocations();
  return result;
};

export const postLocationAction = async (data: Location) => {
  await addNewLocation(data);
};
