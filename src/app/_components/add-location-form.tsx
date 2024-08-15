"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { postLocationAction } from "../actions";
import { Dispatch, SetStateAction, useState } from "react";
import ImageUploader from "./image-uploader";

export default function AddLocationForm({
  coords,
  setShowForm,
  fetchLocations,
}: {
  coords: string[];
  setShowForm: Dispatch<SetStateAction<Boolean>>;
  fetchLocations: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string>("");
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
    const locationId = postLocationAction(data, imageUrl).then((res) => res);
    if (typeof locationId !== "undefined") {
      reset();
      setShowForm(false);
      fetchLocations();
    }
  };

  const utils = [
    "Public Transport",
    "Bathrooms",
    "Forest",
    "Lake",
    "Parking",
    "Ocean",
    "Lean-to",
    "Store",
    "Wheelchair Accessible",
    "Beach",
    "Campfire",
  ];

  return (
    <div className="w-full md:w-1/4  h-full md:h-[800px] absolute md:top-12 md:right-12 z-[1500] bg-white rounded-md p-3">
      <button
        className="text-white bg-red-500 w-16 rounded-md p-1"
        onClick={() => setShowForm(false)}
      >
        X
      </button>
      <ImageUploader setImageUrl={setImageUrl} />
      <form
        className="flex flex-col items-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center p-2 gap-3">
          <label htmlFor="x">Name:</label>
          <input
            className="w-full md:w-1/2 border border-black border-2"
            required
            type="text"
            id="name"
            {...register("name")}
          />
          <label htmlFor="lat">Longitude:</label>
          <input
            defaultValue={coords[0]}
            required
            className="w-full md:w-1/2 border border-black border-2"
            type="text"
            id="lat"
            step="any"
            {...register("latitude")}
          />
          <label htmlFor="long">Latitude:</label>
          <input
            defaultValue={coords[1]}
            required
            className=" w-full md:w-1/2 border border-black border-2"
            type="text"
            id="long"
            step="any"
            {...register("longitude")}
          />
          <textarea
            id="description"
            placeholder="Write something about this campsite!"
            className="w-3/4 h-[100px] border border-black border-2 resize-none"
            {...register("description")}
          ></textarea>
        </div>
        <h3 className="border-black border-b-2">Available Utilites</h3>
        <div className="grid grid-cols-2 w-full gap-2 justify-between h-1/4">
          {utils.map((util, i) => {
            return (
              <div
                className="flex justify-between w-3/4 md:w-full border-black border-b-2 w-full"
                key={i}
              >
                <label className="text-gray-500" htmlFor={util}>
                  {util}
                </label>
                <input
                  type="checkbox"
                  placeholder={util}
                  value={util}
                  {...register("utils", {})}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center md:justify-end w-full p-4">
          <button className="p-3 text-white bg-green-600" type="submit">
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
}
