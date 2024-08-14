"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { postLocationAction } from "../actions";
import { Dispatch, SetStateAction } from "react";

export default function AddLocationForm({
  coords,
  setShowForm,
}: {
  coords: string[];
  setShowForm: Dispatch<SetStateAction<Boolean>>;
}) {
  const { handleSubmit, register, reset } = useForm<{
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
    const locationId = postLocationAction(data).then((res) => res);
    if (typeof locationId !== "undefined") {
      reset();
      setShowForm(false);
    }
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
      <button
        className="text-white bg-red-500 w-16 rounded-md"
        onClick={() => setShowForm(false)}
      >
        X
      </button>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="x">Name:</label>
        <input
          className="bg-blue-200"
          required
          type="text"
          id="name"
          {...register("name")}
        />
        <label htmlFor="lat">Longitude:</label>
        <input
          defaultValue={coords[0]}
          required
          className="bg-blue-200"
          type="text"
          id="lat"
          step="any"
          {...register("latitude")}
        />
        <label htmlFor="long">Latitude:</label>
        <input
          defaultValue={coords[1]}
          required
          className="bg-blue-200"
          type="text"
          id="long"
          step="any"
          {...register("longitude")}
        />
        <textarea
          id="description"
          className="w-3/4 h-[50px]"
          {...register("description")}
        ></textarea>
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
