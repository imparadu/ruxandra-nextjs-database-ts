import Image from "next/image";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export default function AddPicForm() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    currency: "",
    imgUrl: "",
    width: "",
    height: "",
    alt: "",
  });
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const img = new window.Image(); // Use the native browser Image constructor
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setFormData({
        ...formData,
        width: img.width.toString(),
        height: img.height.toString(),
      });
      setThumbnail(img.src); // create thumbnail preview
    };
  }
};


  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.files?.length) {
      const file = inputRef.current.files[0];
      const fileRef = ref(storage, `portfolio/${file.name}`);

      try {
        // upload file to Firestore bucket
        await uploadBytes(fileRef, file);
        const imgUrl = await getDownloadURL(fileRef);
        const updatedFormData = { ...formData, imgUrl }; // save the URL in form data

        // send the form data to your database via POST request
        const response = await fetch("/api/add-pet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        const data = await response.json();

        if (!response.ok) {
          setResponseMessage(`Error: ${data.error}`);
        } else {
          setResponseMessage("Picture and metadata added successfully!");
        }
      } catch (error) {
        console.error("Error uploading file or saving data:", error);
        setResponseMessage("An error occurred while adding the picture.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleUploadAndSave}
        className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Add Picture
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="currency"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Currency</option>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
          {/* Add more currencies as needed */}
        </select>
        <input
          type="text"
          name="alt"
          placeholder="Alt Text"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {thumbnail && (
          <div className="flex flex-col items-center mt-4">
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width="100"
              className="rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-gray-500">
              Image Dimensions: {formData.width} x {formData.height} pixels
            </p>
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-md p-3 mt-4 hover:bg-indigo-700 transition-colors"
        >
          Save
        </button>
      </form>
      {responseMessage && (
        <p className="text-center text-red-500 mt-4">{responseMessage}</p>
      )}
    </div>
  );
}
