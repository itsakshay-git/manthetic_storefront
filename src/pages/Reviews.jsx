import React from "react";
import { useParams } from "react-router-dom";
import { useVariant } from "@/hooks/useVariant";
import { Star } from "lucide-react";

const Reviews = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useVariant(id);

  if (isLoading) return <div className="p-10">Loading reviews...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading reviews</div>;

  const reviews = data?.reviews || [];

  return (
    <div className="px-6 md:px-32 py-12">
      <h1 className="text-4xl font-bold mb-8">All Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet for this product.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
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
              <p className="mt-1 text-sm text-gray-800">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
