"use client";

import { Dispatch, SetStateAction } from "react";
import { UploadButton } from "../../utils/uploadthing";
import "@uploadthing/react/styles.css";

export default function ImageUploader({
  setImageUrl,
}: {
  setImageUrl: Dispatch<SetStateAction<string>>;
}) {
  return (
    <main className="flex h-32 flex-col items-center justify-between">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
