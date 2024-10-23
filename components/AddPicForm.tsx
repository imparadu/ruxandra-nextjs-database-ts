import Image from "next/image";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";
import { fetchPortfolio } from "@/app/api/functions/dbFunctions";

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
  const [loading, setLoading] = useState(false); // Loading state for better UX
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [portfolioData, setPortfolioData] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file)
    if (file) {
      const img = new window.Image(); // Native browser Image constructor
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setFormData((prev) => ({
          ...prev,
          width: img.width.toString(),
          height: img.height.toString(),
        }));
        setThumbnail(img.src); // create thumbnail preview with the blob URL
      };
    }
  };

  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.files?.length) return;

    setLoading(true); // Set loading to true
    const file = inputRef.current.files[0];
    const fileRef = ref(storage, `portfolio/${file.name}`);

    try {
      // Upload file to Firestore bucket
      await uploadBytes(fileRef, file);
      const imgUrl = await getDownloadURL(fileRef);
      const updatedFormData = { ...formData, imgUrl }; // Save the URL in form data

      // Send the form data to your database via POST request
      const response = await fetch("/api/add-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      } else {
        setResponseMessage("Picture and metadata added successfully!");
        console.log("data =", data)
        await fetchPortfolio(); // Refetch data after successful deletion
        setPortfolioData(data.rows)
      }
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
      setResponseMessage("An error occurred while adding the picture.");
    } finally {
      setLoading(false); // Stop loading state
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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      \
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
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="currency"
          value={formData.currency}
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
          value={formData.alt}
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

        {thumbnail && formData.width && formData.height && (
          <div className="flex flex-col items-center mt-4">
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width={100}
              height={100}
              className="rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-gray-500">
              Image Dimensions: {formData.width} x {formData.height} pixels
            </p>
          </div>
        )}

        <button
          type="submit"
          className={`bg-indigo-600 text-white rounded-md p-3 mt-4 hover:bg-indigo-700 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while loading
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
