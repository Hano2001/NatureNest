import { Location } from "./types";

const locations = [
  { x: 45.8054, y: -74.1241, name: "1", utils: ["Bathroom", "Campfire"] },
  { x: 34.8054, y: -74.5241, name: "2", utils: ["Bathroom", "Campfire"] },
  { x: 20.8054, y: -70.0241, name: "3", utils: ["Bathroom", "Campfire"] },
  { x: 20.8054, y: -74.0241, name: "4", utils: ["Bathroom", "Campfire"] },
  { x: 59.33258, y: 18.0649, name: "Stockholm", utils: ["Lake", "Parking"] },
  { x: 59.3372073, y: 18.0116906, name: "Salt", utils: ["Forest"] },
];

export const getAllLocationsAction = () => {
  return locations;
};

export const postLocationAction = (data: Location) => {
  console.log("Before:", locations);
  const newLocation = data;
  locations.push(newLocation);
  console.log("After:", locations);
};
