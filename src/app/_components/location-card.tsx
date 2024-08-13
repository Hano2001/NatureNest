import { Location } from "../types";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="h-96 w-64">
      <h1>{location.name}</h1>
      <p>{location.description}</p>
    </div>
  );
}
