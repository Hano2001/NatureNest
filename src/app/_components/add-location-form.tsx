"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { postLocationAction } from "../actions";

export default function AddLocationForm({ coords }: { coords: string[] }) {
  const { handleSubmit, register } = useForm<{
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

  return (
    <div className="w-1/3 h-1/2 absolute top-52 left-52 z-[450] bg-white rounded-md">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="x">Name:</label>
        <input
          className="bg-blue-200"
          type="text"
          id="name"
          {...register("name")}
        />
        <label htmlFor="lat">Longitude:</label>
        <input
          defaultValue={coords[0]}
          className="bg-blue-200"
          type="text"
          id="lat"
          step="any"
          {...register("latitude")}
        />
        <label htmlFor="long">Latitude:</label>
        <input
          defaultValue={coords[1]}
          className="bg-blue-200"
          type="text"
          id="long"
          step="any"
          {...register("longitude")}
        />
        {/* <button onClick={getUsersLocation}>Use your location</button> */}
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
    </div>
  );
}
