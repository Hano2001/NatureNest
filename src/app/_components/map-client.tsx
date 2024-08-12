"use client";
import dynamic from "next/dynamic";
import MapComponent from "./map-component";

export default function MapClient() {
  return (
    <div className="h-full">
      <h1>Map client</h1>
      <MapComponent />
    </div>
  );
}
