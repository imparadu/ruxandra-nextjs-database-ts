import Image from "next/image";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

type AddPicFormProps = {
  onSave: () => void; // Define the prop type
};

export default function AddPicForm({ onSave }: AddPicFormProps) {
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
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // ... other state variables and functions

  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.files?.length) return;

    setLoading(true);
    const file = inputRef.current.files[0];
    const fileRef = ref(storage, `portfolio/${file.name}`);

    try {
      // Upload file to Firestore bucket
      await uploadBytes(fileRef, file);
      const imgUrl = await getDownloadURL(fileRef);
      const updatedFormData = { ...formData, imgUrl };

      // Send form data to your database via POST request
      const response = await fetch("/api/add-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setResponseMessage("Picture and metadata added successfully!");
      console.log("data =", await response.json());

      onSave(); // Call the onSave function to refresh portfolio data
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
      setResponseMessage("An error occurred while adding the picture.");
    } finally {
      setLoading(false);
      setFormData({
        title: "",
        price: "",
        currency: "",
        imgUrl: "",
        width: "",
        height: "",
        alt: "",
      });
      setThumbnail(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleUploadAndSave}
        className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Form fields go here */}

        <button
          type="submit"
          className={`bg-indigo-600 text-white rounded-md p-3 mt-4 hover:bg-indigo-700 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {responseMessage && (
        <p className="text-center text-red-500 mt-4">{responseMessage}</p>
      )}
    </div>
  );
}
