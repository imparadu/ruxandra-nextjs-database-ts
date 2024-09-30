"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { data, ProductCardProps } from "@/app/api/add-pet/data_types";
import { ProductCard } from "@/app/portfolio/page";
import { useState } from "react";

const AddPicForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    currency: "",
    imgUrl: "",
    width: "",
    height: "",
    alt: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const queryString = new URLSearchParams(formData).toString();
    const url = `/api/add-pet?${queryString}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Picture added successfully!");
        console.log(data); // Handle successful response data here
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while adding the pet.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <select name="currency" onChange={handleChange} required>
          <option value="">Select Currency</option>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
          {/* Add more currencies as needed */}
        </select>
        <input
          type="text"
          name="imgUrl"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="width"
          placeholder="Width"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="alt"
          placeholder="Alt Text"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Picture</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}{" "}
      {/* Display response message */}
    </div>
  );
};

export default function Page() {
  return (
    <>
      <div className="justify-center flex flex-col max-w-lg">
        <div className="xxs:columns-1 xxs:mx-0 xs:columns-1 xs:mx-0 s:columns-2 md:columns-3 lg:columns-4 gap-0 mx-0">
          {data.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
        <AddPicForm />
        {/* <BackToTopButton /> */}
      </div>
    </>
  );
}
