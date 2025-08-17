import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { filterSchema } from "@/lib/validation/filterSchema";
import toast from "react-hot-toast";

export default function Filter({ onApply, onReset }) {
  const [form, setForm] = useState({
    search: "",
    category: "",
    stock: "",
    is_best_selling: false,
    size: "",
  });

  const { data: categories = [], isLoading } = useCategories();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApply = () => {
    const parsed = filterSchema.safeParse(form);
    if (!parsed.success) {
      toast.error("Invalid filter values.");
      return;
    }
    onApply(parsed.data); // pass only validated data
     toast.success("Filters applied successfully!");
  };

  const handleReset = () => {
    const resetForm = {
      search: "",
      category: "",
      stock: "",
      is_best_selling: false,
      size: "",
    };
    setForm(resetForm);
    onReset();
  };

  return (
    <div className="p-4 border border-gray-300 rounded-2xl w-full max-w-[250px] hidden sm:block">
      <h2 className="font-semibold mb-3">Filters</h2>

      {/* Search */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Search</label>
        <input
          name="search"
          value={form.search}
          onChange={handleChange}
          className="border border-gray-300 w-full p-1 rounded"
        />
      </div>

      {/* Stock */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Stock</label>
        {["", "in", "out"].map((option) => (
          <label key={option} className="block">
            <input
              type="radio"
              name="stock"
              value={option}
              checked={form.stock === option}
              onChange={handleChange}
            />{" "}
            {option === "" ? "All" : option === "in" ? "In Stock" : "Out of Stock"}
          </label>
        ))}
      </div>

      {/* Size */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Size</label>
        <select
          name="size"
          value={form.size}
          onChange={handleChange}
          className="w-full border border-gray-300 p-1 rounded"
        >
          <option value="">All</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
      </div>

      {/* Best Selling */}
      <div className="mb-2">
        <label className="block font-medium mb-1">
          <input
            type="checkbox"
            name="is_best_selling"
            checked={form.is_best_selling}
            onChange={handleChange}
          />{" "}
          Best Selling Only
        </label>
      </div>

      {/* Category */}
      <div className="mb-2">
        <label className="block font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-1 rounded"
        >
          <option value="">All</option>
          {!isLoading &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="bg-gray-200 px-3 py-1 rounded-full"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
