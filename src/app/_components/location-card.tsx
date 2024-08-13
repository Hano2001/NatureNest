import { Location } from "../types";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="h-96 w-64">
      <h1>{location.name}</h1>
      <ul>
        {location.utils.map((u, i) => {
          return <li key={i}>{u}</li>;
        })}
      </ul>
    </div>
  );
}
