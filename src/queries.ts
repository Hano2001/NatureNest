"use server";

import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { locations, locations_utils } from "./drizzle/schema";

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
    const newData = await db.insert(locations).values(data).returning();
    const locationId = newData[0].id;
    return locationId;
  } catch (error) {
    throw new Error("Unable to add location");
  }
};
export const addUtils = async (util: string, locationId: string) => {
  try {
    console.log({ util });
    await db
      .insert(locations_utils)
      .values({ type: util, location_id: locationId });
  } catch (error) {
    throw new Error("Failed to add utilities");
  }
};
