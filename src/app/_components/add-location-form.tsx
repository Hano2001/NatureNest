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
    <div className=" md:w-1/5 absolute md:right-0 z-[1500] bg-white h-full flex flex-col justify-between">
      <div>
        <button
          className="text-white bg-red-500 hover:bg-red-400 w-16 rounded-md p-1"
          onClick={() => setShowForm(false)}
        >
          X
        </button>
        <ImageUploader setImageUrl={setImageUrl} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:p-4 p-1">
          <div className="flex flex-col gap-3 ">
            <label className="text-s" htmlFor="x">
              Name
            </label>
            <input
              className="w-full border-black border-2"
              required
              type="text"
              id="name"
              {...register("name")}
            />
            <label className="text-s" htmlFor="cords">
              Coordinates
            </label>
            <div className="flex flex-row gap-3" id="cords">
              <input
                defaultValue={coords[0]}
                required
                className="w-full border-black border-2"
                type="text"
                id="lat"
                step="any"
                placeholder="Latitude"
                {...register("latitude")}
              />
              <input
                defaultValue={coords[1]}
                required
                className=" w-full border-black border-2"
                type="text"
                id="long"
                step="any"
                placeholder="Longitude"
                {...register("longitude")}
              />
            </div>
            <label className="text-s" htmlFor="description">
              Campsite Description
            </label>
            <textarea
              id="description"
              placeholder="Write something about this campsite!"
              className="w-full h-[100px] border-black border-2 resize-none"
              {...register("description")}
            ></textarea>
          </div>
          <label htmlFor="utils" className="text-s">
            Available Utilites
          </label>
          <div
            className="grid grid-cols-1 w-full gap-3 justify-between h-full md:h-1/4"
            id="utils"
          >
            {utils.map((util, i) => {
              return (
                <div
                  className="flex justify-between border-gray-300 border-b-2 w-full pt-1 pb-1"
                  key={i}
                >
                  <label className="" htmlFor={util}>
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
        </div>
        <div>
          <button
            className="w-full p-3  text-white bg-blue-600 hover:bg-blue-400"
            type="submit"
          >
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
}
