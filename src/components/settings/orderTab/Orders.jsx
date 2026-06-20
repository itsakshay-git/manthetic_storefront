import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import OrderItem from "./OrderItem";
import { useCancelOrder } from "@/hooks/useOrders";
import { fallbackStatusClass, orderStatusClassMap, paymentStatusClassMap } from "@/utils/constants/orderStatus";

const Orders = ({ orders, refProp, isFetchingNextPage, hasNextPage }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cancelOrder = useCancelOrder(user?.id);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleCancelOrder = () => {
    if (!orderToCancel) return;

    cancelOrder.mutate(orderToCancel.id, {
      onSuccess: () => setOrderToCancel(null),
    });
  };

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <h3 className="text-lg font-semibold text-gray-950">No Orders Yet</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          You haven't placed any orders yet. Start shopping to see your order history here.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article key={order.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-start sm:justify-between md:p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Order</p>
              <h3 className="mt-1 text-lg font-semibold text-gray-950">#{order.id}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <CancellationAction order={order} onRequestCancel={() => setOrderToCancel(order)} />
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4 md:p-5">
            <InfoTile label="Status">
              <Badge className={orderStatusClassMap[order.status] || fallbackStatusClass}>{order.status}</Badge>
            </InfoTile>
            <InfoTile label="Payment">
              <Badge className={paymentStatusClassMap[order.payment_status] || fallbackStatusClass}>{order.payment_status}</Badge>
            </InfoTile>
            <InfoTile label="Total Amount">
              <p className="font-semibold text-gray-950">Rs. {isNaN(Number(order.total_amount)) ? 0 : order.total_amount}</p>
            </InfoTile>
            <InfoTile label="Items">
              <p className="font-semibold text-gray-950">{order.items.length}</p>
            </InfoTile>
          </div>

          <div className="space-y-3 border-t border-gray-100 p-4 md:p-5">
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        </article>
      ))}

      <div ref={refProp} className="py-4 text-center text-sm text-gray-500">
        {isFetchingNextPage
          ? "Loading more orders..."
          : hasNextPage
            ? "Scroll down to load more"
            : "No more orders"}
      </div>

      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Cancel order</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-950">Order #{orderToCancel.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOrderToCancel(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close cancellation dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-700">
              This will cancel your order and return the items to available stock. This action cannot be undone.
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setOrderToCancel(null)}
                className="min-h-11 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-950"
                disabled={cancelOrder.isPending}
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                className="min-h-11 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={cancelOrder.isPending}
              >
                {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CancellationAction = ({ order, onRequestCancel }) => {
  if (order.canCancel) {
    return (
      <div className="flex flex-col items-start gap-2 sm:items-end">
        <button
          type="button"
          onClick={onRequestCancel}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Cancel Order
        </button>
        {order.cancelUntil && (
          <p className="text-xs text-gray-500">Can cancel until {new Date(order.cancelUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        )}
      </div>
    );
  }

  return (
    <p className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 ring-1 ring-gray-100">
      {order.cancelUnavailableReason || "Cancellation unavailable"}
    </p>
  );
};

const InfoTile = ({ label, children }) => (
  <div className="rounded-xl bg-gray-50 p-3">
    <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">{label}</p>
    <div className="mt-2 text-sm">{children}</div>
  </div>
);

const Badge = ({ className, children }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

export default Orders;
