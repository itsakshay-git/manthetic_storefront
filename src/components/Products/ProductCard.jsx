import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { addToCart } = useCart(token);
  const { data, addToWishlist, removeFromWishlist } = useWishlist(token);

  // Flatten all wishlist variantIds for quick check
  const wishlistItems =
    data?.pages.flatMap((page) =>
      page.products.flatMap((p) => p.variants?.map((v) => v.id))
    ) || [];

  const handleView = (variantId) => {
    navigate(`/product/${variantId}`);
  };

  const handleAddToCart = (variant) => {
    if (!user || !token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(variant);
  };

  const handleToggleWishlist = (variantId) => {
    if (!user || !token) {
      toast.error("Please login to use wishlist");
      navigate("/login");
      return;
    }

    if (wishlistItems.includes(variantId)) {
      removeFromWishlist.mutate({ variantId });
    } else {
      addToWishlist.mutate({ productId: product.id, variantId });
    }
  };

  return (
    <>
      {product.variants?.map((variant) => {
        const isWishlisted = wishlistItems.includes(variant.id);

        return (
          <div
            key={variant.id}
            className="relative group rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={variant.images?.[0] || "/placeholder.png"}
                alt={product.title}
                className="w-full h-50 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* Wishlist Heart - Always visible on mobile, hover effect on desktop */}
            <div
              onClick={() => handleToggleWishlist(variant.id)}
              className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-in-out"
            >
              <Heart
                size={24}
                className={`rounded-full p-1 cursor-pointer ${!user || !token
                  ? "text-gray-400 bg-white/80 hover:text-gray-600 active:scale-95"
                  : isWishlisted
                    ? "text-red-500 bg-white hover:scale-110 active:scale-95"
                    : "text-white bg-black/50 hover:scale-110 active:scale-95"
                  }`}
                fill={!user || !token ? "none" : isWishlisted ? "currentColor" : "none"}
                title={!user || !token ? "Login to use wishlist" : isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              />
              {/* Login prompt for non-authenticated users - Always visible on mobile */}
              {(!user || !token) && (
                <div className="absolute top-8 right-0 bg-black text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Login required
                  <div className="absolute -top-1 right-2 w-1.5 h-1.5 bg-black transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Buttons - Always visible on mobile, hover effect on desktop */}
            <div className="absolute bottom-28 sm:bottom-24 md:bottom-36 lg:bottom-24 w-full flex justify-center gap-3 sm:gap-4 opacity-100 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-in-out">
              <div className="relative">
                <button
                  onClick={() => handleAddToCart(variant)}
                  className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg transition-all duration-200 cursor-pointer ${!user || !token
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed active:scale-95"
                    : "bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95"
                    }`}
                  title={!user || !token ? "Login to add to cart" : "Add to cart"}
                >
                  Add
                </button>
                {/* Login prompt for non-authenticated users - Always visible on mobile */}
                {(!user || !token) && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Login required
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-black transform rotate-45"></div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleView(variant.id)}
                className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg bg-white text-gray-800 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-gray-200"
              >
                View
              </button>
            </div>

            {/* Info */}
            <div className="p-2">
              <h3 className="mt-2 font-medium text-[12px] sm:text-sm">{variant.name}</h3>
              <div className="flex items-center justify-between text-sm mt-1">
                <p className="text-gray-600">
                  ₹{variant.sizeOptions?.[0]?.price || "N/A"}
                </p>
                <div className="flex gap-1 items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  {variant.average_rating || "N/A"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
