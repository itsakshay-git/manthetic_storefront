import React from "react";
import OrderItem from "./OrderItem";

const Orders = ({ orders, refProp, isFetchingNextPage, hasNextPage }) => {
  if (!orders.length) return <p className="text-gray-500">No orders yet.</p>;

  return (
    <div className="space-y-4">
      {orders.map(order => (
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
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                order.status === "CONFIRMED" ? "bg-green-100 text-orange-200" :
                order.status === "SHIPPED" ? "bg-green-300 text-white" :
                order.status === "DELIVERED" ? "bg-green-900 text-white" :
                order.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}>
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
              <p>₹{isNaN(Number(order.total_amount)) ? 0 : order.total_amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p>{order.items.length}</p>
            </div>
          </div>

          {/* List of items */}
          <div className="space-y-2 border-t border-t-gray-300 pt-2">
            {order.items.map(item => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {/* Loader / Infinite Scroll */}
      <div ref={refProp} className="text-center py-4 text-gray-500">
        {isFetchingNextPage
          ? "Loading more orders..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more orders"}
      </div>
    </div>
  );
};

export default Orders;
