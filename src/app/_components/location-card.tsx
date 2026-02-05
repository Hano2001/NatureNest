import { useEffect, useState } from "react";
import { Location } from "../types";
import { getSingleLocationAction } from "../actions";
import Image from "next/image";
import UtilityIcon from "./utility-icon";
import LoadingIcon from "./loading-icon";

export default function LocationCard({ locationId }: { locationId: string }) {
  const [locationInfo, setLocationInfo] = useState<Location | null>(null);
  const [utilInfo, setUtilInfo] = useState<{ type: string }[]>([]);

  function getLocationInfo() {
    getSingleLocationAction(locationId).then((res) => {
      if (res.location) {
        setLocationInfo(res.location);
        setUtilInfo(res.utils);
      }
    });
  }

  if (!locationInfo) {
    getLocationInfo();
  }

  return (
    <div className="flex h-[360px] w-[340px]">
      {locationInfo ? (
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {locationInfo.imageUrl ? (
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                width={400}
                height={200}
                src={locationInfo.imageUrl}
                alt={locationInfo.name || "Campsite image"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-3 px-4 py-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {locationInfo.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {locationInfo.description ||
                  "No description provided for this campsite."}
              </p>
            </div>

            {utilInfo.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Available utilities
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {utilInfo.map((util, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      <UtilityIcon type={util.type} />
                      <span>{util.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/90">
          <LoadingIcon />
          <p className="mt-2 text-xs text-gray-500">Loading location...</p>
        </div>
      )}
    </div>
  );
}
