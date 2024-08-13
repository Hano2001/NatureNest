export default function LocationCard({ location }) {
  return (
    <div className="h-96 w-64">
      <h1>{location.id}</h1>
      <ul>
        {location.utils.map((u, i) => {
          return <li key={i}>{u}</li>;
        })}
      </ul>
    </div>
  );
}
