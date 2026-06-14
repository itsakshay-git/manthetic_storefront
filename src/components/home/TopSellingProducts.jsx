import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTopSellingProducts from "@/hooks/useTopSellingProducts";
import ProductCard from "../Products/ProductCard";

const TopSellingProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTopSellingProducts();
  const products = data?.products || [];

  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-32 py-14">
        <SectionHeader
          onViewAll={() => navigate("/products?is_best_selling=true")}
          disabled
        />
        <LoadingNote label="Loading customer favorites from the server" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full px-4 md:px-32 py-14">
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          Failed to load top selling products. Please refresh the page.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-32 py-14">
      <SectionHeader onViewAll={() => navigate("/products?is_best_selling=true")} />

      {products.length === 0 ? (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
          No top selling products available yet.
        </div>
      ) : (
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      )}
    </section>
  );
};

const SectionHeader = ({ onViewAll, disabled = false }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        Best Sellers
      </p>
      <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">
        Customer Favorites
      </h2>
    </div>
    <button
      type="button"
      onClick={onViewAll}
      disabled={disabled}
      className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    >
      View All
      <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

const LoadingNote = ({ label }) => (
  <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm text-green-700">
    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
    {label}
  </div>
);

const ProductSkeleton = () => (
  <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
    <div className="h-44 sm:h-64 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
    <div className="space-y-3 p-3">
      <div className="h-4 w-3/4 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-16 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-12 rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-8 flex-1 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-8 flex-1 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>
);

export default TopSellingProducts;
