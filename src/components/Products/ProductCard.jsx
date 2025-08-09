import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleView = (variantId) => {
    navigate(`/product/${variantId}`);
  };

  return (
    <>
      {product.variants?.map((variant) => (
        <div
          key={variant.id}
          onClick={() => handleView(variant.id)}
          className="relative group rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
        >
          {/* Image with zoom on hover */}
          <div className="overflow-hidden">
            <img
              src={variant.images?.[0] || "/placeholder.png"}
              alt={product.title}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Top right heart icon */}
          <div className="absolute top-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <Heart
              size={24}
              className="text-white bg-black/50 rounded-full p-1 cursor-pointer"
            />
          </div>

          {/* Bottom buttons */}
          <div className="absolute bottom-20 w-full flex justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <button className="bg-white text-black text-sm font-medium px-4 py-1 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer">
              Add
            </button>
            <button
              onClick={() => handleView(variant.id)}
              className="bg-white text-black text-sm font-medium px-4 py-1 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Product + Variant Info */}
          <div className="p-2">
            <h3 className="mt-2 font-medium text-sm">{variant.name}</h3>

            <div className="flex items-center justify-between text-sm mt-1">
              <p className="text-gray-600">
                ₹{variant.size_options?.[0]?.price || "N/A"}
              </p>
              <div className="flex gap-1 items-center text-yellow-500">
                <Star size={16} fill="currentColor" />
                {variant.average_rating || "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
