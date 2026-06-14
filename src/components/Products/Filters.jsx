import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { filterSchema } from "@/lib/validation/filterSchema";
import toast from "react-hot-toast";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

export default function Filter({ onApply, onReset, className = "" }) {
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
    onApply(parsed.data);
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
    <div className={`w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            Refine
          </p>
          <h2 className="mt-1 text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-5">
        <Field label="Search">
          <input
            name="search"
            value={form.search}
            onChange={handleChange}
            placeholder="Search shirts, jeans..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </Field>

        <Field label="Stock">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["", "All"],
              ["in", "In"],
              ["out", "Out"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-xs font-medium transition ${
                  form.stock === value
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="stock"
                  value={value}
                  checked={form.stock === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </Field>

        <Field label="Size">
          <select
            name="size"
            value={form.size}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          >
            <option value="">All sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </Field>

        <Field label="Category">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          >
            <option value="">All categories</option>
            {!isLoading &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </Field>

        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-sm text-gray-700">
          <span>Best Selling Only</span>
          <input
            type="checkbox"
            name="is_best_selling"
            checked={form.is_best_selling}
            onChange={handleChange}
            className="h-4 w-4 accent-green-600"
          />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="rounded-full bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

const Field = ({ label, children }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);
