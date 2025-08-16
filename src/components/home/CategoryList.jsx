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

      <div className="flex items-center gap-10 no-scrollbar pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="min-w-[120px] sm:min-w-[140px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-60 h-70 object-cover rounded-md shadow"
            />
            <span className="text-sm font-medium">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
