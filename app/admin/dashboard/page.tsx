"use client";
import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export default function Page() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files.length > 0
    ) {
      const file = inputRef.current.files[0];
      console.log(file, "acesta este file"); // Log the file object

      // Get the dimensions of the image
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      console.log(file,'asd')

      const fileRef = ref(storage, `images/${file.name}`);
      uploadBytes(fileRef, file)
        .then(() => {
          console.log("File uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  return (
    <>
      <div className="justify-center flex flex-col ">
        <h1>Dashboard Page</h1>
        <form onSubmit={handleUpload}>
          <input ref={inputRef} type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
        {imageDimensions && (
          <div>
            <p>
              Image Dimensions: {imageDimensions.width} x{" "}
              {imageDimensions.height} pixels
            </p>
          </div>
        )}
      </div>
    </>
  );
}
