import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useWishlist from "@/hooks/useWishlist";
import ProductCard from "@/components/Products/ProductCard";

const WishList = () => {
  const token = localStorage.getItem("manthetic_token");
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWishlist(token);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Trigger fetch when bottom sentinel is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!token) {
    return <p className="text-center mt-10">Please log in to view your wishlist.</p>;
  }

  if (isLoading) return <p className="text-center mt-10">Loading wishlist...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="px-6 md:px-32 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>

          {/* Loader & Infinite Scroll Trigger */}
          {isFetchingNextPage && (
            <p className="text-center mt-6">Loading more...</p>
          )}
          <div ref={ref} className="h-10" />
        </>
      )}
    </div>
  );
};

export default WishList;
