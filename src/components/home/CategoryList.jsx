import { useCategories } from "@/hooks/useCategories";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { data: categories = [], isLoading, isError } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/products?category_id=${cat.id}`);
  };

  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-8 lg:px-32 py-10">
        <CategoryHeader />
        <LoadingNote label="Loading categories from the server" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <CategorySkeleton key={index} featured={index === 0} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full px-4 md:px-8 lg:px-32 py-10">
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          Failed to load categories. Please refresh the page.
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="w-full px-4 md:px-8 lg:px-32 py-10">
        <CategoryHeader />
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
          No categories available yet.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-8 lg:px-32 py-10">
      <CategoryHeader />

      <div className="mt-8 md:hidden">
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar pb-2">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => handleCategoryClick(cat)}
              className="w-44 shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 hidden md:grid grid-cols-4 gap-5 lg:gap-6">
        {categories.map((cat, index) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => handleCategoryClick(cat)}
            className={index === 0 ? "md:col-span-2" : ""}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryHeader = () => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        Shop By Category
      </p>
      <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">
        Find Your Fit
      </h2>
    </div>
    <p className="max-w-md text-sm md:text-base text-gray-600">
      Jump straight into the styles that match your day, from everyday comfort to sharper essentials.
    </p>
  </div>
);

const LoadingNote = ({ label }) => (
  <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm text-green-700">
    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
    {label}
  </div>
);

const CategorySkeleton = ({ featured = false }) => (
  <div
    className={`relative h-56 md:h-64 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 ${
      featured ? "md:col-span-2" : ""
    }`}
  >
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
      <div className="h-3 w-20 rounded-full bg-white/70" />
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="h-6 w-28 rounded-full bg-white/80" />
        <div className="h-9 w-9 rounded-full bg-white/80" />
      </div>
    </div>
  </div>
);

const CategoryCard = ({ category, onClick, className = "", featured = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative h-56 md:h-64 overflow-hidden rounded-xl bg-gray-100 text-left shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  >
    <img
      src={category.image}
      alt={category.name}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          {featured && (
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-white/70">
              Featured
            </p>
          )}
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {category.name}
          </h3>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </button>
);

export default CategoryList;

