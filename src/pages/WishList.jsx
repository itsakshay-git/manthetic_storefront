import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useWishlist from "@/hooks/useWishlist";
import ProductCard from "@/components/Products/ProductCard";
import { storageKeys } from "@/lib/storageKeys";
import StatusPanel from "@/components/common/StatusPanel";
import { Link } from "react-router-dom";

const WishList = () => {
  const token = localStorage.getItem(storageKeys.authToken);
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
    return (
      <div className="px-6 md:px-32 py-8">
        <StatusPanel
          type="empty"
          title="Login Required"
          message="Please log in to view your wishlist."
          action={(
            <Link to="/login" className="inline-flex bg-black px-5 py-2 rounded-full text-white">
              Go To Login
            </Link>
          )}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-6 md:px-32 py-8">
        <StatusPanel
          type="loading"
          title="Loading Wishlist"
          message="Fetching your saved products."
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 md:px-32 py-8">
        <StatusPanel
          type="error"
          title="Failed To Load Wishlist"
          message={error?.message || "Please refresh the page and try again."}
        />
      </div>
    );
  }

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="px-6 md:px-32 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <StatusPanel
          type="empty"
          title="Your Wishlist Is Empty"
          message="Save products you like and they will appear here."
          action={(
            <Link to="/products" className="inline-flex bg-black px-5 py-2 rounded-full text-white">
              Browse Products
            </Link>
          )}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
