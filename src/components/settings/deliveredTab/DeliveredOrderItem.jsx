import React from "react";
import { Check, Star } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10";

const DeliveredOrderItem = ({ item, reviewForm, handleChangeReview, handleSubmitReview, addReview }) => {
  const reviewed = item.reviewed;

  return (
    <div className="rounded-xl bg-gray-50 p-3 md:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-gray-200">
            <img src={item.images[0]} alt={item.variant_name} className="h-14 w-14 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-950">{item.product_name}</p>
            <p className="mt-1 truncate text-sm text-gray-500">Variant: {item.variant_name}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm sm:max-w-sm">
              <Meta label="Size" value={item.size} />
              <Meta label="Qty" value={item.quantity} />
              <Meta label="Price" value={`Rs. ${item.price}`} />
            </div>
          </div>
        </div>

        {reviewed ? (
          <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 ring-1 ring-gray-200 lg:shrink-0">
            <Check className="h-4 w-4 text-green-600" />
            Reviewed
          </span>
        ) : (
          <button
            type="button"
            onClick={handleSubmitReview}
            disabled={addReview.isPending}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto lg:shrink-0"
          >
            <Star className="h-4 w-4" />
            {addReview.isPending ? "Submitting..." : "Add Review"}
          </button>
        )}
      </div>

      {!reviewed && (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[140px_1fr]">
          <input
            type="number"
            placeholder="Rating 1-5"
            min={1}
            max={5}
            value={reviewForm[item.id]?.rating || ""}
            onChange={(e) => handleChangeReview(item.id, "rating", e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Write your comment..."
            value={reviewForm[item.id]?.comment || ""}
            onChange={(e) => handleChangeReview(item.id, "comment", e.target.value)}
            className={`${inputClass} resize-none`}
            rows={2}
          />
        </div>
      )}
    </div>
  );
};

const Meta = ({ label, value }) => (
  <div className="rounded-lg bg-white px-2 py-2 text-center ring-1 ring-gray-100">
    <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">{label}</p>
    <p className="mt-1 truncate font-medium text-gray-800">{value}</p>
  </div>
);

export default DeliveredOrderItem;
