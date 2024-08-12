//import MapComponent from "./_components/map-component";

import dynamic from "next/dynamic";

export default function Home() {
  const MapClient = dynamic(() => import("./_components/map-client"), {
    ssr: false,
  });
  return (
    <main className="h-full">
      <h1>MAP</h1>
      <MapClient />
    </main>
  );
}
