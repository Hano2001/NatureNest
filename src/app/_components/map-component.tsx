import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { useGeolocated } from "react-geolocated";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import LocationCard from "./location-card";
import { getAllLocationsAction } from "../actions";
import { Location } from "../types";

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    getAllLocationsAction().then((res) => {
      setLocations(res);
    });
  }, []);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });
  function GetCoords() {
    useMapEvents({
      click(e) {
        console.log(e);
      },
    });
    return null;
  }
  locations.forEach((l) => {});

  return (
    <div className="h-full">
      <button onClick={() => console.log(coords)}>Coords</button>
      <MapContainer
        center={[59.33258, 18.0649]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <GetCoords />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((l, i) => {
          return (
            <Marker
              key={i}
              position={[parseFloat(l.longitude), parseFloat(l.latitude)]}
            >
              <Popup>
                <LocationCard location={l} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
