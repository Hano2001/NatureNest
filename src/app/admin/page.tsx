"use client";
import { useEffect, useState } from "react";
import { deleteLocationAction, getAllLocationsAction } from "../actions";
import { Location } from "../types";

export default function AdminPage() {
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    getAllLocationsAction().then((res) => {
      if (res) {
        setLocations(res);
      }
    });
  }, []);
  if (!locations) {
    return <p>Loading locations...</p>;
  }

  const deleteLocation = (id: string) => {
    const result = deleteLocationAction(id);
    if (result !== undefined) {
      const filteredLocations = locations.filter(
        (location) => location.id !== id,
      );
      setLocations([...filteredLocations]);
      console.log("Location", result, "Deleted!");
    }
  };

  return (
    <>
      <ul>
        {locations.map((location, i) => {
          return (
            <div key={i}>
              <strong>{location.name}</strong>
              <button onClick={() => deleteLocation(location.id)}>
                Delete Campsite
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}
