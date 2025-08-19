import React from "react";

const FallbackSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {/* Circle spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>

      {/* Skeleton blocks */}
      <div className="space-y-3 w-72">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
};

export default FallbackSkeleton;
