import React from "react";
import { useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

// Zod schema for one review
const singleReviewSchema = z.object({
  id: z.string(),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(1, "Comment is required"),
});

// Array schema
const reviewsSchema = z.object({
  reviews: z.array(singleReviewSchema),
});

// Fetch reviews
const fetchUserReviews = async (userId) => {
  const { data } = await axios.get(`/reviews/user/${userId}`);
  return Array.isArray(data) ? data : data?.reviews ?? [];
};

const deleteUserReview = async (reviewId) => {
  const { data } = await axios.delete(`/reviews/delete/${reviewId}`);
  return data;
};

// Update review API
const updateUserReview = async ({ reviewId, rating, comment }) => {
  const { data } = await axios.put(`/reviews/${reviewId}`, {
    rating,
    comment,
  });
  return data;
};

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  // Fetch user reviews
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userReviews", user?.id],
    queryFn: () => fetchUserReviews(user.id),
    enabled: !!user?.id,
  });

  const reviewsData = Array.isArray(data) ? data : [];

  // Mutation for updating single review
  const mutation = useMutation({
    mutationFn: updateUserReview,
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userReviews", user.id] });
    },
    onError: () => toast.error("Failed to update review"),
  });

  const deleteMutation = useMutation({
  mutationFn: deleteUserReview,
  onSuccess: () => {
    toast.success("Review deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["userReviews", user.id] });
  },
  onError: () => toast.error("Failed to delete review"),
});

  const { control, reset, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(reviewsSchema),
    defaultValues: {
      reviews: reviewsData.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        product_name: review.product_name || review.variant_name,
        variant_name: review.variant_name,
        created_at: review.created_at,
      })),
    },
  });

  React.useEffect(() => {
    if (!isLoading && reviewsData.length) {
      reset({
        reviews: reviewsData.map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          product_name: review.product_name || review.variant_name,
          variant_name: review.variant_name,
          created_at: review.created_at,
        })),
      });
    }
  }, [isLoading, reviewsData, reset]);

  const { fields } = useFieldArray({
    control,
    name: "reviews",
  });

  if (isLoading) return <p>Loading your reviews...</p>;
  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;
  if (!reviewsData.length) return <p>No reviews found.</p>;

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <form
          key={field.id}
          onSubmit={(e) => {
            e.preventDefault();
            const reviewValues = getValues(`reviews.${index}`);
            mutation.mutate({
              reviewId: reviewValues.id,
              rating: reviewValues.rating,
              comment: reviewValues.comment,
            });
          }}
          className="border border-gray-200 rounded-xl p-5 shadow-md bg-white space-y-4"
        >
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg">{field.product_name}</h3>
            <p className="text-gray-500 text-sm">Variant: {field.variant_name}</p>
          </div>

          {/* Rating + Comment + Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr_auto_auto] gap-4 items-start">
            {/* Rating */}
            <div className="flex flex-col gap-1">
              <Controller
                name={`reviews.${index}.rating`}
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    min={1}
                    max={5}
                    {...field}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  />
                )}
              />
              {errors.reviews?.[index]?.rating && (
                <span className="text-red-500 text-xs">
                  {errors.reviews[index].rating.message}
                </span>
              )}
            </div>

            {/* Comment */}
            <div className="flex flex-col gap-1">
              <Controller
                name={`reviews.${index}.comment`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={2}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                )}
              />
              {errors.reviews?.[index]?.comment && (
                <span className="text-red-500 text-xs">
                  {errors.reviews[index].comment.message}
                </span>
              )}
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm shadow-sm w-full sm:w-auto"
            >
              {mutation.isPending ? "Saving..." : "Update"}
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this review?")) {
                  const reviewValues = getValues(`reviews.${index}`);
                  deleteMutation.mutate(reviewValues.id);
                }
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm shadow-sm w-full sm:w-auto flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Created at */}
          <p className="text-gray-400 text-xs mt-1">
            Created at: {new Date(field.created_at).toLocaleString()}
          </p>
        </form>
      ))}
    </div>
  );
};

export default UserReviews;
