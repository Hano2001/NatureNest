"use server";

import { db } from "./drizzle";
import { locations } from "./drizzle/schema";

export const getAllLocations = async () => {
  try {
    const res = db.query.locations.findMany();
    return res;
  } catch (error) {
    throw new Error("Error when fetching locations");
  }
};

type newLocation = typeof locations.$inferInsert;
export const addNewLocation = async (data: newLocation) => {
  try {
    await db.insert(locations).values({
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      description: data.description,
    });
  } catch (error) {
    throw new Error("Unable to add location");
  }
};

// name: text("name").notNull(),
//   latitude: numeric("latitude").notNull(),
//   longitude: numeric("longitude").notNull(),
//   description: text("description"),
