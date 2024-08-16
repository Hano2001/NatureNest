"use client";
import { useEffect, useState } from "react";
import { deleteLocationAction, getAllLocationsAction } from "../actions";
import { Location } from "../types";
import LoadingIcon from "../_components/loading-icon";

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
    return (
      <>
        <p>Loading locations...</p>
      </>
    );
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
    <div className="flex justify-center w-full p-4 gap-3">
      <ul className="w-full">
        {locations.map((location, i) => {
          return (
            <div className="flex justify-between border-b-4 w-3/4" key={i}>
              <div className="flex flex-col">
                <strong>ID: {location.id}</strong>
                <strong>Name: {location.name}</strong>
                <strong>Description: {location.description}</strong>
              </div>
              <button
                className="bg-red-500 hover:bg-red-400 text-xl text-white p-4"
                onClick={() => deleteLocation(location.id)}
              >
                Delete Campsite
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
