import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapComponent() {
  const locations = [
    [45.8054, -74.1241],
    [34.8054, -74.5241],
    [20.8054, -70.0241],
    [20.8054, -74.0241],
    [59.33258, 18.0649],
  ];
  return (
    <div className="h-full">
      <MapContainer
        center={[40.8054, -74.0241]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((l, i) => {
          return <Marker key={i} position={[l[0], l[1]]}></Marker>;
        })}
      </MapContainer>
    </div>
  );
}
