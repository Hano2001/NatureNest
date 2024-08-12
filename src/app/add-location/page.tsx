"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

export default function AddLocationPage() {
  const { handleSubmit, register } = useForm<{
    x: string;
    y: string;
    utils: string[];
  }>();

  const onSubmit: SubmitHandler<{ x: string; y: string; utils: string[] }> = (
    data,
  ) => {
    console.log({ data });
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
        <label htmlFor="x">Longitude</label>
        <input className="bg-blue-200" type="text" id="x" {...register("x")} />
        <label htmlFor="y">Latitude</label>
        <input className="bg-blue-200" type="text" id="y" {...register("y")} />
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
