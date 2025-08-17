import React from "react";
import DeliveredOrderItem from "../deliveredTab/DeliveredOrderItem";

const DeliveredOrders = ({
  deliveredOrders,
  reviewForm,
  handleChangeReview,
  handleSubmitReview,
  addReview,
  deliveredRef,
  isLoadingDelivered,
  isErrorDelivered,
  isFetchingNextDelivered,
  hasNextDelivered,
}) => {
  if (isLoadingDelivered) return <p>Loading delivered orders...</p>;
  if (isErrorDelivered) return <p className="text-red-500">Failed to fetch delivered orders.</p>;

  return (
    <div className="space-y-4">
      {deliveredOrders.map(order => (
        <div key={order.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-blue-600">Order #{order.id}</span>
            <span className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-white">
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment</p>
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                order.payment_status === "PAID" ? "bg-green-100 text-green-800" :
                order.payment_status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                order.payment_status === "FAILED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}>
                {order.payment_status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p>₹{order.total_amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p>{order.items.length}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 border-t border-t-gray-300 pt-3">
            {order.items.map(item => (
              <DeliveredOrderItem
                key={item.id}
                item={item}
                reviewForm={reviewForm}
                handleChangeReview={handleChangeReview}
                handleSubmitReview={() => handleSubmitReview(order.id, item)}
                addReview={addReview}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Loader / Infinite Scroll */}
      <div ref={deliveredRef} className="text-center py-4 text-gray-500">
        {isFetchingNextDelivered
          ? "Loading more delivered orders..."
          : hasNextDelivered
          ? "Scroll down to load more"
          : "No more delivered orders"}
      </div>
    </div>
  );
};

export default DeliveredOrders;
