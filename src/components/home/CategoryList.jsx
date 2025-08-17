import { useCategories } from "@/hooks/useCategories";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useCategories();
  const navigate = useNavigate();

  if (isLoading) return <p className="px-4">Loading...</p>;
  if (isError) return <p className="px-4 text-red-500">Failed to load categories</p>;

  const handleCategoryClick = (cat) => {
    navigate(`/products?category_id=${cat.id}`);
  };

  return (
    <section className="w-full px-4 md:px-32 py-8">
      <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-10">
        Category List
      </h2>

      {/* ✅ Mobile: horizontal scroll */}
      <div className="block md:hidden">
        <div className="flex items-start gap-6 overflow-x-auto overflow-y-hidden no-scrollbar pb-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="flex-shrink-0 w-36 sm:w-44 flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 sm:h-48 object-cover rounded-lg shadow"
              />
              <span className="text-sm sm:text-base font-medium text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    {/* ✅ Desktop: grid without scroll clipping */}
    <div className="hidden md:block">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="relative cursor-pointer flex flex-col items-center transition-transform duration-300 transform-gpu hover:scale-105 hover:z-10"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-60 h-64 object-cover rounded-xl shadow-lg"
            />
            <span className="mt-3 text-lg font-semibold text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default CategoryList;
