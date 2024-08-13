import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { useGeolocated } from "react-geolocated";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

export default function MapComponent() {
  const [userCoords, setUserCoords] = useState<number[] | undefined>();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });
  const locations = [
    { x: 45.8054, y: -74.1241, id: "1" },
    { x: 34.8054, y: -74.5241, id: "2" },
    { x: 20.8054, y: -70.0241, id: "3" },
    { x: 20.8054, y: -74.0241, id: "4" },
    { x: 59.33258, y: 18.0649, id: "Stockholm" },
  ];
  const defaultCoords = userCoords
    ? [userCoords[0], userCoords[1]]
    : [59.33258, 18.0649];

  function getUserLocation() {
    if (typeof coords !== "undefined") {
      setUserCoords([coords.latitude, coords.latitude]);
    }
  }

  return (
    <div className="h-full">
      <MapContainer
        center={[defaultCoords[0], defaultCoords[1]]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <button onClick={() => setUserCoords(coords)}>Show my position</button>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((l, i) => {
          return (
            <Marker key={i} position={[l.x, l.y]}>
              <Popup>{l.id}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
