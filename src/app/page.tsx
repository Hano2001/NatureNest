import dynamic from "next/dynamic";

export default function Home() {
  const MapClient = dynamic(() => import("./_components/map-client"), {
    ssr: false,
  });
  return (
    <main className="h-full">
      <MapClient />
    </main>
  );
}
