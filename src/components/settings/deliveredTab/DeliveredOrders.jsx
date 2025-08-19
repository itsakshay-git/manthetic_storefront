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
  if (isLoadingDelivered) return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading delivered orders...</p>
    </div>
  );
  if (isErrorDelivered) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Delivered Orders</h3>
      <p className="text-gray-500 max-w-md mb-4">
        We encountered an error while loading your delivered orders. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );

  if (!deliveredOrders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Delivered Orders Yet</h3>
        <p className="text-gray-500 max-w-md">
          You don't have any delivered orders yet. Once your orders are delivered, you'll be able to review them here.
        </p>
        <button
          onClick={() => window.location.href = '/products'}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

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
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${order.payment_status === "PAID" ? "bg-green-100 text-green-800" :
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
