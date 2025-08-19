import React, { useEffect, useState } from "react";
import useFilteredProducts from "../hooks/useFilteredProducts";
import Filter from "../components/Products/Filters";
import ProductCard from "../components/Products/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Filter as FilterIcon, X } from "lucide-react";

export default function Products() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    in_stock: false,
    out_of_stock: false,
    is_best_selling: false,
    size: "",
  });

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView({ threshold: 1 });

  const [isFilterOpen, setIsFilterOpen] = useState(false); // ✅ mobile filter toggle

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useFilteredProducts({ ...filters, page });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const { data: categories = [] } = useCategories();

  const selectedCategory = filters.category
    ? categories.find((cat) => String(cat.id) === String(filters.category))?.name
    : null;

  // Extract search term from URL query
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const bestSellingParam = searchParams.get("is_best_selling") === "true";
    const categoryId = searchParams.get("category_id");
    setFilters((prev) => ({
      ...prev,
      search: urlSearch,
      is_best_selling: bestSellingParam,
      category: categoryId,
    }));
    setPage(1);
    setAllProducts([]);
  }, [searchParams]);

  useEffect(() => {
    if (data?.products) {
      setAllProducts((prev) =>
        page === 1 ? [...data.products] : [...prev, ...data.products]
      );
    }
  }, [data, page]);

  // Trigger loading next page when "inView" becomes true
  useEffect(() => {
    if (inView && !isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, totalPages]);

  return (
    <div className="px-6 md:px-32">
      {/* Header */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-semibold">
          {selectedCategory || "All Products"}
        </h1>

        {/* Mobile Filter Button */}
        <button
          className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700"
          onClick={() => setIsFilterOpen(true)}
        >
          <FilterIcon className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Sidebar Filter (hidden on mobile) */}
        <div className="hidden md:block">
          <Filter
            className="hidden md:block"
            onApply={(newFilters) => {
              setFilters({
                ...newFilters,
                in_stock: newFilters.stock === "in",
                out_of_stock: newFilters.stock === "out",
              });
              setPage(1);
              setAllProducts([]);
            }}
            onReset={() => {
              setFilters({
                search: "",
                category: "",
                in_stock: false,
                out_of_stock: false,
                is_best_selling: false,
                size: "",
              });
              setPage(1);
              setAllProducts([]);
            }}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading && page === 1 ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Something went wrong.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Loader Trigger for Infinite Scroll */}
              <div ref={ref} className="flex justify-center py-6">
                {isFetching && <p>Loading more...</p>}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ✅ Mobile Filter Dialog */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-lg p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Filter Component */}
            <div className="block md:hidden">
              <Filter
                className="block md:hidden"
                onApply={(newFilters) => {
                  setFilters({
                    ...newFilters,
                    in_stock: newFilters.stock === "in",
                    out_of_stock: newFilters.stock === "out",
                  });
                  setPage(1);
                  setAllProducts([]);
                  setIsFilterOpen(false); // ✅ close after apply
                }}
                onReset={() => {
                  setFilters({
                    search: "",
                    category: "",
                    in_stock: false,
                    out_of_stock: false,
                    is_best_selling: false,
                    size: "",
                  });
                  setPage(1);
                  setAllProducts([]);
                  setIsFilterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
