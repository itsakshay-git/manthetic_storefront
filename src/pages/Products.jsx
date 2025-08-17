import React, { useEffect, useState } from "react";
import useFilteredProducts from "../hooks/useFilteredProducts";
import Filter from "../components/Products/Filters";
import ProductCard from "../components/Products/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

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
      <h1 className="text-2xl font-semibold my-4">
        {selectedCategory || "All Products"}
      </h1>

      <div className="flex gap-6 items-start">
        <Filter
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

        <div className="flex-1">
          {isLoading && page === 1 ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Something went wrong.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
}
