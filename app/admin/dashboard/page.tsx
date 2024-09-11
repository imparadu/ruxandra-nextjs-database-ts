"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "@/app/lib/firebaseConfig";

export default function Page() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  //  const [file, setFile] = useState<File | null> (null)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const fileRef = ref(storage, `portfolio/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file)
        .then(() => {
          console.log("File uploaded successfully!");
          // console.log(snapshot, "asd");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      getDownloadURL(ref(storage, `portfolio/Logo_maybe.png`)).then((url) => {
        console.log(url);
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
