import { useEffect, useState } from "react";
import { Location } from "../types";
import { getSingleLocationAction } from "../actions";
import Image from "next/image";
import UtilityIcon from "./utility-icon";

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
    <div className="flex h-[400px] w-[350px]">
      {locationInfo ? (
        <div className="flex flex-col justify-center">
          <Image
            width={150}
            height={150}
            src={locationInfo.imageUrl ? locationInfo.imageUrl : ""}
            alt="No image to show"
          ></Image>
          <strong>{locationInfo.name}</strong>
          <p>{locationInfo.description}</p>
          <ul>
            {utilInfo.map((util, i) => {
              return (
                <li key={i}>
                  <UtilityIcon type={util.type} />
                  {util.type}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
