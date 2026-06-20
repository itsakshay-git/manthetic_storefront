import React, { useEffect, useMemo, useState } from "react";
import useFilteredProducts from "../hooks/useFilteredProducts";
import Filter from "../components/Products/Filters";
import ProductCard from "../components/Products/ProductCard";
import AiStyleFinder from "../components/Products/AiStyleFinder";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Filter as FilterIcon, Loader2, Search, X } from "lucide-react";

const emptyFilters = {
  search: "",
  category: "",
  in_stock: false,
  out_of_stock: false,
  is_best_selling: false,
  size: "",
};

export default function Products() {
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView({ threshold: 1 });

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useFilteredProducts({ ...filters, page });

  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount;

  const { data: categories = [] } = useCategories();

  const selectedCategory = filters.category
    ? categories.find((cat) => String(cat.id) === String(filters.category))?.name
    : null;

  const activeFilters = useMemo(
    () => getActiveFilters(filters, selectedCategory),
    [filters, selectedCategory]
  );

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const bestSellingParam = searchParams.get("is_best_selling") === "true";
    const categoryId = searchParams.get("category_id") || "";

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

  useEffect(() => {
    if (inView && !isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, page, totalPages]);

  const applyFilters = (newFilters) => {
    setFilters({
      ...newFilters,
      in_stock: newFilters.stock === "in",
      out_of_stock: newFilters.stock === "out",
    });
    setPage(1);
    setAllProducts([]);
  };

  const resetFilters = () => {
    setFilters(emptyFilters);
    setPage(1);
    setAllProducts([]);
  };

  const hasProducts = allProducts.length > 0;

  return (
    <div className="px-4 py-6 md:px-8 lg:px-32 md:py-10">
      <header className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Shop Collection
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
              {selectedCategory || "All Products"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
              Browse fits, compare styles, and open any product card to see full details.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white lg:hidden"
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
            {typeof totalCount === "number" ? `${totalCount} results` : "Curated products"}
          </span>
          {activeFilters.map((item) => (
            <span
              key={item}
              className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-100"
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-8 flex gap-6 items-start">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24">
            <Filter onApply={applyFilters} onReset={resetFilters} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <AiStyleFinder filters={filters} />
          {isLoading && page === 1 ? (
            <ProductGridSkeleton />
          ) : isError ? (
            <StatePanel
              title="Products Could Not Load"
              message="The server may still be waking up. Please refresh the page in a moment."
            />
          ) : hasProducts ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div ref={ref} className="flex justify-center py-8">
                {isFetching ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading more products
                  </div>
                ) : page >= totalPages ? (
                  <p className="text-sm text-gray-400">You have reached the end.</p>
                ) : null}
              </div>
            </>
          ) : (
            <StatePanel
              title="No Products Found"
              message="Try clearing filters or searching for a different style."
              action={(
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
                >
                  Reset Filters
                </button>
              )}
            />
          )}
        </section>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="flex h-full w-[86%] max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Refine
                </p>
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <Filter
                onApply={(newFilters) => {
                  applyFilters(newFilters);
                  setIsFilterOpen(false);
                }}
                onReset={() => {
                  resetFilters();
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

const getActiveFilters = (filters, selectedCategory) => {
  const active = [];
  if (filters.search) active.push(`Search: ${filters.search}`);
  if (selectedCategory) active.push(selectedCategory);
  if (filters.in_stock) active.push("In stock");
  if (filters.out_of_stock) active.push("Out of stock");
  if (filters.is_best_selling) active.push("Best sellers");
  if (filters.size) active.push(`Size ${filters.size}`);
  return active;
};

const ProductGridSkeleton = () => (
  <div>
    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm text-green-700">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      Loading products from the server
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="h-44 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 sm:h-72" />
          <div className="space-y-3 p-3">
            <div className="h-4 w-3/4 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-12 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatePanel = ({ title, message, action }) => (
  <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-500 ring-1 ring-gray-200">
      <Search className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);



