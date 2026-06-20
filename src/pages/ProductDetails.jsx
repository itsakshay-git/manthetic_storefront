import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Heart, Minus, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";

import ProductCard from "@/components/Products/ProductCard";
import StatusPanel from "@/components/common/StatusPanel";
import API from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { storageKeys } from "@/lib/storageKeys";
import { useRelatedProducts } from "@/hooks/useRelatedProducts";
import { useVariant } from "@/hooks/useVariant";
import useWishlist from "@/hooks/useWishlist";
import { displayErrorMessages } from "@/utils/errorHandler";
import { productTrustItems } from "@/utils/constants/productDetail";


const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useVariant(id);
  const { data: relatedProducts, isLoading: loadingRelated } = useRelatedProducts(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const token = localStorage.getItem(storageKeys.authToken);
  const { data: wishlistData, addToWishlist, removeFromWishlist } = useWishlist(token);

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
    if (data?.sizeOptions?.length && !selectedSize) {
      setSelectedSize(data.sizeOptions[0].size);
    }
  }, [data?.sizeOptions, selectedSize]);

  if (isLoading) {
    return (
      <main className="px-4 py-8 md:px-8 lg:px-32 md:py-12">
        <StatusPanel
          type="loading"
          title="Loading Product"
          message="Fetching product details."
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-4 py-8 md:px-8 lg:px-32 md:py-12">
        <StatusPanel
          type="error"
          title="Failed To Load Product"
          message="Please refresh the page or try another product."
        />
      </main>
    );
  }

  const variant = data ?? {};
  const {
    name,
    description,
    images = [],
    sizeOptions = [],
    reviews = [],
  } = variant;

  const currentSize = sizeOptions.find((s) => s.size === selectedSize) || sizeOptions[0];
  const hasSizeOptions = sizeOptions.length > 0;
  const isWishlisted = wishlistItems.includes(variant.id);
  const rating = averageRating(reviews);
  const stock = currentSize?.stock ?? 0;
  const isOutOfStock = !hasSizeOptions || stock <= 0;

  const handleAddToCart = async () => {
    if (!token) return toast.error("You must be logged in to add to cart.");

    try {
      await API.post(
        "/cart",
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
      queryClient.invalidateQueries({ queryKey: queryKeys.cartRoot() });
    } catch (err) {
      displayErrorMessages(err, "Failed to add to cart", toast.error);
    }
  };

  const handleToggleWishlist = () => {
    if (!token) return toast.error("You must be logged in to use wishlist.");
    if (isWishlisted) {
      removeFromWishlist.mutate({ variantId: variant.id });
    } else {
      addToWishlist.mutate({ productId: variant.productId, variantId: variant.id });
    }
  };

  return (
    <main className="bg-white px-4 py-6 md:px-8 lg:px-32 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/products" className="transition hover:text-gray-950">Products</Link>
          <span>/</span>
          <span className="truncate text-gray-900">{name}</span>
        </nav>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <ProductGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            name={name}
          />

          <section className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm md:p-6 lg:min-h-[620px]">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                      Manthetic Essential
                    </p>
                    <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-950 md:text-4xl lg:text-[2.5rem]">
                      {name}
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                      isWishlisted
                        ? "border-rose-200 bg-rose-50 text-rose-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-950 hover:text-gray-950"
                    }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-3xl font-bold text-gray-950">Rs. {currentSize?.price ?? 0}</p>
                  <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {rating}/5
                    <span className="text-gray-400">({reviews.length})</span>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${stock > 0 ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                  </span>
                </div>

                <ProductDescription
                  description={description}
                  expanded={descriptionExpanded}
                  onToggle={() => setDescriptionExpanded((current) => !current)}
                />

                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-950">Select Size</p>
                    {!hasSizeOptions && <span className="text-sm text-gray-500">No sizes available</span>}
                  </div>
                  {hasSizeOptions && (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {sizeOptions.map((opt) => (
                        <button
                          key={opt.size}
                          type="button"
                          onClick={() => setSelectedSize(opt.size)}
                          className={`min-h-11 rounded-full border px-3 text-sm font-medium transition ${
                            selectedSize === opt.size
                              ? "border-gray-950 bg-gray-950 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-950"
                          }`}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
                  <div className="flex min-h-12 items-center justify-between rounded-full bg-white px-2 ring-1 ring-gray-200 sm:w-36">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-gray-950">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                  >
                    {isOutOfStock ? "Unavailable" : "Add To Cart"}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 border-t border-gray-200 pt-4 sm:grid-cols-3">
                  {productTrustItems.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-sm text-gray-600 ring-1 ring-gray-100">
                      {React.createElement(Icon, { className: "h-4 w-4 shrink-0 text-green-600" })}
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <Link to="/shipping" className="hover:text-gray-950">Shipping Policy</Link>
                  <span>/</span>
                  <Link to="/returns" className="hover:text-gray-950">Return Policy</Link>
                </div>
              </div>
            </div>
          </section>
        </section>

        <ProductInfo description={description} />
        <ReviewsSection reviews={reviews} rating={rating} variantId={variant.id} navigate={navigate} />
        <RelatedSection relatedProducts={relatedProducts} loadingRelated={loadingRelated} />
      </div>
    </main>
  );
};

const ProductDescription = ({ description, expanded, onToggle }) => {
  const text = description?.trim()
    ? description
    : "A clean Manthetic staple made for easy everyday styling.";
  const canToggle = text.length > 150;

  return (
    <div className="rounded-xl bg-white/70 p-3 ring-1 ring-gray-100">
      <p className={`text-sm leading-6 text-gray-600 ${!expanded && canToggle ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      {canToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 text-sm font-medium text-gray-950 underline-offset-4 hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};
const ProductGallery = ({ images, selectedImage, setSelectedImage, name }) => {
  const displayImage = selectedImage || images[0] || "/fallback.jpg";

  return (
    <section className="grid h-full grid-cols-1 gap-3 md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto no-scrollbar md:order-1 md:flex-col md:overflow-visible">
        {images.map((img, index) => (
          <button
            key={img || index}
            type="button"
            onClick={() => setSelectedImage(img)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 ring-1 transition md:h-24 md:w-full ${
              selectedImage === img ? "ring-2 ring-gray-950" : "ring-gray-200 hover:ring-gray-400"
            }`}
          >
            <img src={img} alt={`${name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="order-1 flex aspect-[4/5] min-h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 md:order-2 lg:min-h-[620px]">
        <img
          src={displayImage}
          alt={name}
          className="h-full w-full object-cover transition duration-300"
        />
      </div>
    </section>
  );
};

const ProductInfo = ({ description }) => (
  <section className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Details</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">Built for repeat wear.</h2>
    </div>
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed text-gray-700 md:p-6 md:text-base">
      {description?.trim()
        ? description
        : "No product description available at the moment."}
    </div>
  </section>
);

const ReviewsSection = ({ reviews, rating, variantId, navigate }) => (
  <section className="mt-10">
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Reviews</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">Customer Notes</h2>
      </div>
      {reviews.length > 3 && (
        <button
          type="button"
          onClick={() => navigate(`/reviews/${variantId}`)}
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
        >
          View More Reviews
        </button>
      )}
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex flex-col justify-center rounded-2xl bg-gray-950 p-6 text-white">
        <div className="flex items-center gap-2 text-green-400">
          <Star className="h-5 w-5 fill-current" />
          <span className="text-sm font-medium">Average Rating</span>
        </div>
        <p className="mt-4 text-6xl font-bold">{rating}</p>
        <p className="mt-2 text-sm text-white/60">Based on {reviews.length} customer reviews</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 md:p-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">No reviews yet. Be the first to review this product.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.slice(0, 3).map((review) => (
              <article key={review.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-950">{review.user_name}</h4>
                    <div className="mt-1 flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

const RelatedSection = ({ relatedProducts, loadingRelated }) => (
  <section className="mt-10">
    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Keep Looking</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">Related Products</h2>
      </div>
      <p className="max-w-md text-sm text-gray-500">More pieces that sit close to this fit, category, or style.</p>
    </div>

    {loadingRelated ? (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm text-gray-500">
        Loading related products...
      </div>
    ) : relatedProducts?.length ? (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    ) : (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm text-gray-500">
        No related products found.
      </div>
    )}
  </section>
);

const averageRating = (reviews) => {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export default ProductDetails;







