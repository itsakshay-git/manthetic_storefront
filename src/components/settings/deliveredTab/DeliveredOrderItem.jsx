import React from "react";

const DeliveredOrderItem = ({ item, reviewForm, handleChangeReview, handleSubmitReview, addReview }) => {
  const reviewed = item.reviewed;

  return (
    <div className="bg-gray-50 rounded p-3 flex flex-col gap-2">
      {/* Item Info */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img src={item.images[0]} alt={item.variant_name} className="w-12 h-12 object-contain rounded" />
          <div>
            <p className="text-sm font-semibold">{item.product_name}</p>
            <p className="text-gray-500 text-sm">Variant: {item.variant_name}</p>
            <div className="flex gap-3 text-sm mt-1">
              <span>Size: {item.size}</span>
              <span>Qty: {item.quantity}</span>
              <span>Price: ₹{item.price}</span>
            </div>
          </div>
        </div>

        {/* Review Button */}
        {reviewed ? (
          <button disabled className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm cursor-not-allowed">
            Reviewed
          </button>
        ) : (
          <button
            onClick={handleSubmitReview}
            disabled={addReview.isPending}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
          >
            {addReview.isPending ? "Submitting..." : "Add Review"}
          </button>
        )}
      </div>

      {/* Review Form */}
      {!reviewed && (
        <div className="flex flex-col gap-2 mt-2">
          <input
            type="number"
            placeholder="Rating 1-5"
            min={1} max={5}
            value={reviewForm[item.id]?.rating || ""}
            onChange={(e) => handleChangeReview(item.id, "rating", e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full"
          />
          <textarea
            placeholder="Write your comment..."
            value={reviewForm[item.id]?.comment || ""}
            onChange={(e) => handleChangeReview(item.id, "comment", e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full resize-none"
            rows={2}
          />
        </div>
      )}
    </div>
  );
};

export default DeliveredOrderItem;
