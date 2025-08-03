import categoryJacket from "@/assets/images/category-jacket.jpg";
import categoryShirt from "@/assets/images/category-shirt.jpg";
import categoryJeans from "@/assets/images/category-jeans.jpg";
import categoryHoodie from "@/assets/images/category-hoodie.jpg";

const categories = [
  { label: "JACKET", image: categoryJacket },
  { label: "SHIRT", image: categoryShirt },
  { label: "JEANS", image: categoryJeans },
  { label: "HOODIE", image: categoryHoodie },
  { label: "HOODIE", image: categoryHoodie },
];

const CategoryList = () => {
  return (
    <section className="w-full px-4 md:px-32 py-8">
      <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-10">
        Category List
      </h2>
      <div className="flex items-center gap-10 no-scrollbar pb-2">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`min-w-[120px] sm:min-w-[140px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105`}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-60 h-70 object-cover rounded-md shadow"
            />
            <span className="text-sm font-medium">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
