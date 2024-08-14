"use client";
import { useEffect, useState } from "react";
import { getAllLocationsAction } from "../actions";
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

  return (
    <>
      <ul>
        {locations.map((location, i) => {
          return (
            <div key={i}>
              <strong>{location.name}</strong>
              <button onClick={() => console.log("Deleting", location.id)}>
                Delete Campsite
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}
