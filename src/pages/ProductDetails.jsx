import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVariant } from "@/hooks/useVariant";
import { Star, Heart } from "lucide-react";
import ProductCard from "@/components/Products/ProductCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import useWishlist from "@/hooks/useWishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useVariant(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("manthetic_token");

  // ✅ Wishlist hook
  const { data: wishlistData, addToWishlist, removeFromWishlist } = useWishlist(token);

  // Flatten wishlist variantIds
  const wishlistItems =
    wishlistData?.pages.flatMap((page) =>
      page.products.flatMap((p) => p.variants?.map((v) => v.id))
    ) || [];

  useEffect(() => {
    if (data?.images?.length) {
      setSelectedImage(data.images[0]);
    }
  }, [data?.images]);

  useEffect(() => {
    if (data?.size_options?.length && !selectedSize) {
      setSelectedSize(data.size_options[0].size);
    }
  }, [data?.size_options, selectedSize]);

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error fetching variant</div>;

  const variant = data ?? {};
  const {
    name,
    description,
    images = [],
    size_options = [],
    reviews = [],
  } = variant;

  const currentSize =
    size_options.find((s) => s.size === selectedSize) || size_options[0];

  const isWishlisted = wishlistItems.includes(variant.id);

  const handleAddToCart = async () => {
    if (!token) return toast.error("You must be logged in to add to cart.");

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          variant_id: variant.id,
          quantity,
          selected_size: selectedSize,
          selected_price: currentSize?.price || 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart successfully");
      queryClient.invalidateQueries(["cart"]);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // ✅ Wishlist toggle handler
  const handleToggleWishlist = () => {
    if (!token) return toast.error("You must be logged in to use wishlist.");
    if (isWishlisted) {
      removeFromWishlist.mutate({ variantId: variant.id });
    } else {
      addToWishlist.mutate({ productId: variant.product_id, variantId: variant.id });
    }
  };

  return (
    <div className="px-6 md:px-32 py-12">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[480px] bg-white border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage || "/fallback.jpg"}
              alt={name}
              className="max-h-full max-w-full object-contain transition duration-300 ease-in-out"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded overflow-hidden shrink-0 ${
                  selectedImage === img ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-start py-5">
          <div className="flex flex-col gap-6">
            <span className="self-start bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700">
              {"category"}
            </span>

            <div>
              <h1 className="text-4xl font-bold mb-6">{name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-xl font-semibold text-black">
                  ₹{currentSize.price}
                </p>
                <div className="flex items-center text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <span className="text-sm ml-1">
                    {averageRating(reviews)}/5
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">Stock: {currentSize.stock}</p>

            {/* Size Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-700 text-sm">Select Size:</span>
              {size_options.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => setSelectedSize(opt.size)}
                  className={`px-4 py-1 border rounded-full text-sm ${
                    selectedSize === opt.size
                      ? "bg-black text-white border-black"
                      : "text-gray-700"
                  }`}
                >
                  {opt.size}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-start w-fit border border-gray-300 rounded-full px-4 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-lg font-bold px-2"
                >
                  -
                </button>
                <span className="mx-2 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg font-bold px-2"
                >
                  +
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-6 py-2 rounded-full"
                >
                  Add to Cart
                </button>

                {/* ✅ Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`flex items-center gap-2 border px-6 py-2 rounded-full transition ${
                    isWishlisted
                      ? "border-red-500 text-red-500 bg-red-100"
                      : "border-gray-400 text-black hover:text-white hover:bg-black"
                  }`}
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href="/shipping"
                className="text-sm underline text-blue-600 hover:text-blue-800"
              >
                Shipping Policy
              </a>
              <a
                href="/returns"
                className="text-sm underline text-blue-600 hover:text-blue-800"
              >
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-4xl font-semibold mb-8">Details</h2>
        <p className="text-gray-700 border border-gray-300 p-5 rounded-2xl bg-gray-50">
          {description?.trim()
            ? description
            : "No product description available at the moment."}
        </p>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-4xl font-semibold mb-8">Reviews</h2>
        <div className="flex">
          <div className="text-6xl font-bold w-[20%] flex justify-center items-center">
            {averageRating(reviews)}/5
          </div>

          <div className="border border-gray-300 bg-gray-50 rounded-2xl px-2 w-[80%]">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-4">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              <>
                {reviews.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-300 rounded-xl p-3 my-2 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{review.user_name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <Star size={16} fill="currentColor" />
                      {review.rating}
                    </div>
                    <p className="mt-1 text-sm text-gray-800">
                      {review.comment}
                    </p>
                  </div>
                ))}

                {reviews.length > 3 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => navigate("/reviews")}
                      className="text-black text-sm bg-green-600 px-4 py-2"
                    >
                      View More Reviews →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-4xl font-semibold mb-8">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCard
              key={i}
              product={{
                title: name,
                variants: [
                  {
                    id,
                    name,
                    images,
                    size_options: [currentSize],
                    average_rating: averageRating(reviews),
                  },
                ],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helpers
const averageRating = (reviews) => {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export default ProductDetails;
