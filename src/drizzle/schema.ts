import { relations } from "drizzle-orm";
import { text, pgTable, uuid } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  description: text("description"),
});

export const locations_utils = pgTable("locations_utils", {
  type: text("type").notNull(),
  location_id: uuid("location_id"),
});

export const utilsRelations = relations(locations_utils, ({ one }) => ({
  location: one(locations, {
    fields: [locations_utils.location_id],
    references: [locations.id],
  }),
}));
