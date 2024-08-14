import { useEffect, useState } from "react";
import { Location } from "../types";
import { getSingleLocationAction } from "../actions";

export default function LocationCard({ location }: { location: Location }) {
  const [locationInfo, setLocationInfo] = useState({});
  useEffect(() => {
    getSingleLocationAction(location.id).then((res) => setLocationInfo(res));
  }, []);

  return (
    <div className="h-96 w-64">
      {location.id ? (
        <div>
          <h1>{location.id}</h1>
          <p>{location.description}</p>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
