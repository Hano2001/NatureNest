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
  setShowForm: Dispatch<SetStateAction<boolean>>;
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
  }> = async (data) => {
    const locationId = await postLocationAction(data, imageUrl);

    if (!locationId) return;

    reset();
    setShowForm(false);
    fetchLocations();
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
    <div className="absolute inset-y-0 right-0 z-[1500] flex w-full md:w-[26rem]">
      <div className="flex h-full w-full flex-col bg-white border-l border-gray-200 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Add new location
            </h2>
            <p className="text-xs text-gray-500">
              Fill in the details for this campsite.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setShowForm(false)}
          >
            <span className="sr-only">Close</span>×
          </button>
        </div>

        <div className="border-b border-gray-100 px-4 py-3">
          <ImageUploader setImageUrl={setImageUrl} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="flex-1 space-y-6 px-4 py-4">
            <div className="space-y-1.5">
              <label
                className="block text-xs font-medium uppercase tracking-wide text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="text"
                id="name"
                {...register("name")}
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-xs font-medium uppercase tracking-wide text-gray-700"
                htmlFor="coords"
              >
                Coordinates
              </label>
              <div
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                id="coords"
              >
                <input
                  defaultValue={coords[0] ?? ""}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="text"
                  id="lat"
                  step="any"
                  placeholder="Latitude"
                  inputMode="decimal"
                  {...register("latitude")}
                />
                <input
                  defaultValue={coords[1] ?? ""}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  type="text"
                  id="long"
                  step="any"
                  placeholder="Longitude"
                  inputMode="decimal"
                  {...register("longitude")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-xs font-medium uppercase tracking-wide text-gray-700"
                htmlFor="description"
              >
                Campsite description
              </label>
              <textarea
                id="description"
                placeholder="Write a short description of this campsite..."
                className="block h-28 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("description")}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="utils"
                className="block text-xs font-medium uppercase tracking-wide text-gray-700"
              >
                Available utilities
              </label>
              <p className="text-xs text-gray-500">
                Select all utilities that are available at this location.
              </p>
              <div className="grid grid-cols-1 gap-2" id="utils">
                {utils.map((util, i) => {
                  return (
                    <div
                      className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:border-blue-500"
                      key={i}
                    >
                      <label className="text-sm text-gray-700" htmlFor={util}>
                        {util}
                      </label>
                      <input
                        id={util}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        placeholder={util}
                        value={util}
                        {...register("utils", {})}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-3">
            <button
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              type="submit"
            >
              Add location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
