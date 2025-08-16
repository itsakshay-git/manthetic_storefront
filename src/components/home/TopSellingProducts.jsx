import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTopSellingProducts from "@/hooks/useTopSellingProducts";
import ProductCard from "../Products/ProductCard";

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
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
