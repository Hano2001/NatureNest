import { useEffect, useState } from "react";
import { Location } from "../types";
import { getSingleLocationAction } from "../actions";

export default function LocationCard({ location }: { location: Location }) {
  const [locationInfo, setLocationInfo] = useState<Location | null>(null);
  useEffect(() => {
    getSingleLocationAction(location.id).then((res) => {
      if (res) {
        setLocationInfo(res);
      }
    });
  }, []);

  return (
    <div className="h-96 w-64">
      {locationInfo ? (
        <div>
          <h1>{locationInfo.id}</h1>
          <h2>{locationInfo.name}</h2>
          <p>{locationInfo.description}</p>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
