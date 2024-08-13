"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { postLocationAction } from "../actions";
import { useGeolocated } from "react-geolocated";

export default function AddLocationPage() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const { handleSubmit, register, setValue } = useForm<{
    name: string;
    latitude: string;
    longitude: string;
    description: string;
    utils: string[];
  }>({});

  const onSubmit: SubmitHandler<{
    name: string;
    latitude: string;
    longitude: string;
    description: string;
    utils: string[];
  }> = (data) => {
    postLocationAction(data);
  };

  const utils = [
    "Public Transport",
    "Bathrooms",
    "Forest",
    "Lake",
    "Parking",
    "Campfire",
  ];

  const getUsersLocation = () => {
    if (coords) {
      setValue("latitude", (coords?.longitude).toString());
      setValue("longitude", (coords?.latitude).toString());
    } else {
      console.log("Unabled to fetch information");
    }
  };
  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="x">Name:</label>
        <input
          className="bg-blue-200"
          type="text"
          id="name"
          {...register("name")}
        />
        <label htmlFor="x">Longitude:</label>
        <input
          className="bg-blue-200"
          type="text"
          id="x"
          step="any"
          {...register("latitude")}
        />
        <label htmlFor="y">Latitude:</label>
        <input
          className="bg-blue-200"
          type="text"
          id="y"
          step="any"
          {...register("longitude")}
        />
        <button onClick={getUsersLocation}>Use your location</button>
        {utils.map((u, i) => {
          return (
            <div key={i}>
              <label htmlFor={u}>{u}</label>
              <input
                type="checkbox"
                placeholder={u}
                value={u}
                {...register("utils", {})}
              />
            </div>
          );
        })}

        <button type="submit">Add Location</button>
      </form>
    </>
  );
}
