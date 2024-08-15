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
import AddLocationForm from "./add-location-form";
import LoadingIcon from "./loading-icon";

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [selectCoords, setSelectCoords] = useState<string[]>(["", ""]);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  function fetchLocations() {
    getAllLocationsAction().then((res) => {
      if (res) {
      }
      setLocations(res);
      setSelectCoords(["", ""]);
    });
  }

  if (!locations) {
    fetchLocations();
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <LoadingIcon />
        <p>Loading locations...</p>
      </div>
    );
  }

  function GetCoords() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const locationCoords = [lng.toString(), lat.toString()];
        if (confirm("Do you want to add a campsite to this location?")) {
          setSelectCoords(locationCoords);
          setShowForm(true);
        }
      },
    });
    return null;
  }

  locations.forEach((l) => {});

  return (
    <div className="h-full w-full overflow-auto">
      {showForm ? (
        <AddLocationForm
          coords={selectCoords}
          fetchLocations={fetchLocations}
          setShowForm={setShowForm}
        />
      ) : null}
      {!showForm ? (
        <button
          className="bg-green-500 text-white  text-l md:text-2xl p-3 z-[1500] bottom-3 hover:bg-green-400 right-3 absolute"
          onClick={() => {
            setShowForm((showForm) => !showForm);
            coords
              ? setSelectCoords([
                  coords.longitude.toString(),
                  coords.latitude.toString(),
                ])
              : null;
          }}
        >
          Add new campsite to your Location
        </button>
      ) : null}
      <MapContainer
        center={[59.33258, 18.0649]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="overflow-auto"
      >
        <GetCoords />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, i) => {
          return (
            <Marker
              key={i}
              position={[
                parseFloat(location.longitude),
                parseFloat(location.latitude),
              ]}
            >
              <Popup>
                <LocationCard locationId={location.id} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
