import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTopSellingProducts from "@/hooks/useTopSellingProducts";

const TopSellingProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTopSellingProducts();
  const products = data?.products || [];

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;

  return (
    <section className="w-full px-4 md:px-32 py-20">
      <div className="flex justify-center items-center flex-col mb-20">
        <h2 className="text-2xl md:text-5xl font-bold text-gray-800">
          Top Selling Products
        </h2>
        <button
          className="bg-green-500 text-white text-sm px-4 py-2 rounded-full mt-14"
          onClick={() => navigate("/products?is_best_selling=true")}
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map(product => {
          const bestVariant = product.variants.find(v => v.is_best_selling);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={bestVariant?.images?.[0] || product.imageurl}
                alt={product.title}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-600 font-semibold">
                    ₹{bestVariant?.price || "N/A"}
                  </span>
                  <span className="flex items-center text-sm text-yellow-500">
                    <Star size={14} className="fill-yellow-500 mr-1" />
                    {bestVariant?.average_rating || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopSellingProducts;
