import React, { useEffect, useState } from "react";
import useFilteredProducts from "../hooks/useFilteredProducts";
import Filter from "../components/Products/Filters";
import ProductCard from "../components/Products/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Products() {
  const [filters, setFilters] = useState({
  search: "",
  category: "",
  stock: "", // "in", "out", or ""
  is_best_selling: false,
  size: "", // "S", "M", "L", "XL", etc.
});
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

const {
  data,
  isLoading,
  isError,
  isPreviousData
} = useFilteredProducts({ ...filters, page });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const { data: categories = [] } = useCategories();

const selectedCategory = filters.category
  ? categories.find((cat) => String(cat.id) === String(filters.category))?.name
  : null;

  console.log(selectedCategory)


    // Extract search term from URL query
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const bestSellingParam = searchParams.get("is_best_selling") === "true";
    const categoryId = searchParams.get("category_id");
    setFilters(prev => ({
      ...prev,
      search: urlSearch,
      is_best_selling: bestSellingParam,
      category: categoryId,
    }));
    setPage(1);
  }, [searchParams]);

  return (
    <div className="px-6 md:px-32">
        <h1 className="text-2xl font-semibold my-4">
        {selectedCategory || "All Products"}
        </h1>

      <div className="flex gap-6 items-start">
        <Filter
          onApply={(newFilters) => {
            console.log(newFilters)
            setFilters(newFilters);
            setPage(1); // reset page on filter
          }}
            onReset={() => {
            setFilters({
                search: "",
                category: "",
                stock: "",
                is_best_selling: false,
                size: "",
            });
            setPage(1);
            }}
        />

        <div className="flex-1">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Something went wrong.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex justify-center mt-10 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-black hover:text-white rounded-full disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

                {/* Optional: Numbered Pagination */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center border rounded-full ${
                      page === index + 1 ? "border border-gray-300 text-black" : ""
                    }`}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={isPreviousData || page === totalPages}
                  className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-black hover:text-white rounded-full disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
