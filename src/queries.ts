"use server";

import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { locations } from "./drizzle/schema";

export const getAllLocations = async () => {
  try {
    const res = await db.query.locations.findMany();
    return res;
  } catch (error) {
    throw new Error("Error when fetching locations");
  }
};

export const getSingleLocation = async (id: string) => {
  try {
    const res = await db.query.locations.findFirst({
      where: eq(locations.id, id),
    });
    return res;
  } catch (error) {
    throw new Error("Failed to get Location");
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
