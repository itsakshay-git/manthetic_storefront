import React from "react";
import { useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../../../lib/axios";
import toast from "react-hot-toast";
import { Star, Trash2 } from "lucide-react";
import { queryKeys } from "@/lib/queryKeys";
import { displayErrorMessages } from "@/utils/errorHandler";
import StatusPanel from "@/components/common/StatusPanel";

const singleReviewSchema = z.object({
  id: z.string(),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(1, "Comment is required"),
});

const reviewsSchema = z.object({
  reviews: z.array(singleReviewSchema),
});

const fetchUserReviews = async (userId) => {
  const { data } = await API.get(`/reviews/user/${userId}`);
  return Array.isArray(data) ? data : data?.reviews ?? [];
};

const deleteUserReview = async (reviewId) => {
  const { data } = await API.delete(`/reviews/delete/${reviewId}`);
  return data;
};

const updateUserReview = async ({ reviewId, rating, comment }) => {
  const { data } = await API.put(`/reviews/${reviewId}`, {
    rating,
    comment,
  });
  return data;
};

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.userReviews(user?.id),
    queryFn: () => fetchUserReviews(user.id),
    enabled: !!user?.id,
  });

  const reviewsData = React.useMemo(() => Array.isArray(data) ? data : [], [data]);

  const mutation = useMutation({
    mutationFn: updateUserReview,
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.userReviews(user.id) });
    },
    onError: (err) => displayErrorMessages(err, "Failed to update review", toast.error),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserReview,
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.userReviews(user.id) });
    },
    onError: (err) => displayErrorMessages(err, "Failed to delete review", toast.error),
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

  if (isLoading) {
    return <StatusPanel type="loading" title="Loading Reviews" message="Fetching your product reviews." />;
  }

  if (isError) {
    return <StatusPanel type="error" title="Failed To Load Reviews" message="Please refresh the page and try again." />;
  }

  if (!reviewsData.length) {
    return <StatusPanel type="empty" title="No Reviews Yet" message="Delivered orders you review will appear here." />;
  }

  return (
    <div className="space-y-4">
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
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-gray-950">{field.product_name}</h3>
              <p className="mt-1 truncate text-sm text-gray-500">Variant: {field.variant_name}</p>
            </div>
            <p className="text-xs text-gray-400">
              {new Date(field.created_at).toLocaleString()}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[120px_1fr_auto] lg:items-start">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                Rating
              </label>
              <Controller
                name={`reviews.${index}.rating`}
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      className="w-full rounded-xl border border-gray-200 px-3 py-3 pr-9 text-center text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
                    />
                    <Star className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                  </div>
                )}
              />
              {errors.reviews?.[index]?.rating && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.reviews[index].rating.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                Comment
              </label>
              <Controller
                name={`reviews.${index}.comment`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={2}
                    className="w-full resize-y rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
                  />
                )}
              />
              {errors.reviews?.[index]?.comment && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.reviews[index].comment.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2 lg:min-w-44 lg:grid-cols-1">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mutation.isPending ? "Saving..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this review?")) {
                    const reviewValues = getValues(`reviews.${index}`);
                    deleteMutation.mutate(reviewValues.id);
                  }
                }}
                disabled={deleteMutation.isPending}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Delete review"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default UserReviews;
