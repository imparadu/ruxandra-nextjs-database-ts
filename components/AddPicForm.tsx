import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";
import { PortfolioItem } from "@/app/api/addItem/data_types";

interface AddPicFormProps {
  onSave: () => Promise<void>;
  selectedItem?: PortfolioItem | null;
  onClearSelection?: () => void;
}

export default function AddPicForm({
  onSave,
  selectedItem,
  onClearSelection,
}: AddPicFormProps) {
  const initialFormState = useMemo(
    () => ({
      title: "",
      price: "",
      currency: "",
      imgUrl: "",
      width: "",
      height: "",
      alt: "",
    }),
    [],
  );

  const [formData, setFormData] = useState(initialFormState);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Memoize initialFormState to avoid useEffect dependency warning
  const memoizedInitialFormState = React.useMemo(
    () => initialFormState,
    [initialFormState],
  );

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || "",
        price: selectedItem.price?.toString() || "",
        currency: selectedItem.currency || "",
        imgUrl: selectedItem.imgurl || "",
        width: selectedItem.width?.toString() || "",
        height: selectedItem.height?.toString() || "",
        alt: selectedItem.alt || "",
      });
      setThumbnail(selectedItem.imgurl);
      setIsFormDirty(false);
    } else {
      setFormData(memoizedInitialFormState);
      setThumbnail(null);
      setIsFormDirty(false);
    }
  }, [selectedItem, memoizedInitialFormState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormDirty(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setFormData((prev) => ({
          ...prev,
          width: img.width.toString(),
          height: img.height.toString(),
        }));
        setThumbnail(img.src);
      };
      setIsFormDirty(true);
    }
  };

  const handleUploadAndSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDirty && selectedItem) {
      setResponseMessage("No changes made");
      return;
    }

    setLoading(true);
    let imgUrl = formData.imgUrl;

    try {
      // Handle file upload if there's a new file
      if (inputRef.current?.files?.length) {
        const file = inputRef.current.files[0];
        const fileRef = ref(storage, `portfolio/${file.name}`);
        await uploadBytes(fileRef, file);
        imgUrl = await getDownloadURL(fileRef);
      }

      // Prepare the data with proper types
      const updatedFormData = {
        title: formData.title,
        price: formData.price,
        currency: formData.currency,
        imgUrl: imgUrl, // This will be converted to imgurl in the database
        width: formData.width,
        height: formData.height,
        alt: formData.alt,
      };

      const endpoint = selectedItem
        ? `/api/updateItem/${selectedItem.id}`
        : "/api/addItem";

      const response = await fetch(endpoint, {
        method: selectedItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      }

      setResponseMessage(
        selectedItem
          ? `Item updated successfully! ${
              data.item ? "(ID: " + data.item.id + ")" : ""
            }`
          : "Item added successfully!",
      );

      await onSave();

      if (selectedItem && onClearSelection) {
        onClearSelection();
      }

      if (!selectedItem) {
        resetForm();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setResponseMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while saving.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setThumbnail(null);
    setIsFormDirty(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    if (onClearSelection) {
      onClearSelection();
    }
    resetForm();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-2">
      <form
        onSubmit={handleUploadAndSave}
        className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedItem ? "Edit Item" : "Add New Item"}
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
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required={!selectedItem}
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

        <div className="flex gap-2">
          <button
            type="submit"
            className={`flex-1 bg-indigo-600 text-white rounded-md p-3 hover:bg-indigo-700 transition-colors ${
              loading || (!isFormDirty && selectedItem)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={Boolean(loading || (!isFormDirty && selectedItem))} // Fixed the type error
          >
            {loading ? "Saving..." : selectedItem ? "Update" : "Save"}
          </button>

          {selectedItem && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white rounded-md p-3 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {responseMessage && (
        <p
          className={`text-center mt-4 ${
            responseMessage.includes("error")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}
