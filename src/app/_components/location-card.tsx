import { useEffect, useState } from "react";
import { Location } from "../types";
import { getSingleLocationAction } from "../actions";
import Image from "next/image";

export default function LocationCard({ locationId }: { locationId: string }) {
  const [locationInfo, setLocationInfo] = useState<Location | null>(null);
  const [utilInfo, setUtilInfo] = useState<{ type: string }[]>([]);
  useEffect(() => {
    getSingleLocationAction(locationId).then((res) => {
      if (res.location) {
        setLocationInfo(res.location);
        setUtilInfo(res.utils);

        console.log(res);
      }
    });
  }, []);

  return (
    <div className="h-96 w-64">
      {locationInfo ? (
        <div>
          <Image
            width={100}
            height={100}
            src={locationInfo.imageUrl ? locationInfo.imageUrl : ""}
            alt="No image to show"
          ></Image>
          <h2>{locationInfo.name}</h2>
          <p>{locationInfo.description}</p>
          <ul>
            {utilInfo.map((util, i) => {
              return <li key={i}>{util.type}</li>;
            })}
          </ul>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
