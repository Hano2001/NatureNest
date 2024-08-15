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

export const getSingleLocation = async (locationId: string) => {
  try {
    const location = await db.query.locations.findFirst({
      where: eq(locations.id, locationId),
    });
    const utils = await db
      .select({ type: locations_utils.type })
      .from(locations_utils)
      .where(eq(locations_utils.location_id, locationId));

    return { location, utils };
  } catch (error) {
    throw new Error("Failed to get Location");
  }
};
type newLocation = typeof locations.$inferInsert;
export const addNewLocation = async (data: newLocation) => {
  try {
    console.log(data);
    const newData = await db.insert(locations).values(data).returning();
    const locationId = newData[0].id;
    return locationId;
  } catch (error) {
    throw new Error("Unable to add location");
  }
};
export const addUtils = async (util: string, locationId: string) => {
  try {
    await db
      .insert(locations_utils)
      .values({ type: util, location_id: locationId });
  } catch (error) {
    throw new Error("Failed to add utilities");
  }
};

export const deleteLocation = async (locationId: string) => {
  try {
    await db.delete(locations).where(eq(locations.id, locationId));
    await db
      .delete(locations_utils)
      .where(eq(locations_utils.location_id, locationId));
    return locationId;
  } catch (error) {
    throw Error("Failed to delete location");
  }
};
