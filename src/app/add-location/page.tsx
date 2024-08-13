"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { postLocationAction } from "../actions";

export default function AddLocationPage() {
  const { handleSubmit, register } = useForm<{
    name: string;
    x: number;
    y: number;
    utils: string[];
  }>();

  const onSubmit: SubmitHandler<{
    name: string;
    x: number;
    y: number;
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          type="number"
          id="x"
          step="any"
          {...register("x")}
        />
        <label htmlFor="y">Latitude:</label>
        <input
          className="bg-blue-200"
          type="number"
          id="y"
          step="any"
          {...register("y")}
        />
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
