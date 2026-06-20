import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import DeliveredOrderItem from "../deliveredTab/DeliveredOrderItem";
import { deliveredStatusClass, fallbackStatusClass, paymentStatusClassMap } from "@/utils/constants/orderStatus";


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
  const navigate = useNavigate();

  if (isLoadingDelivered) return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-950" />
      <p className="mt-4 text-sm text-gray-600">Loading delivered orders...</p>
    </div>
  );

  if (isErrorDelivered) return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <ShoppingBag className="h-9 w-9" />
      </div>
      <h3 className="text-lg font-semibold text-gray-950">Failed To Load Delivered Orders</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
        We encountered an error while loading your delivered orders. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
      >
        Refresh Page
      </button>
    </div>
  );

  if (!deliveredOrders.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="text-lg font-semibold text-gray-950">No Delivered Orders Yet</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          Once your orders are delivered, you will be able to review them here.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliveredOrders.map((order) => (
        <article key={order.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Delivered Order</p>
              <h3 className="mt-1 text-lg font-semibold text-gray-950">#{order.id}</h3>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4 md:p-5">
            <InfoTile label="Status">
              <Badge className={deliveredStatusClass}>{order.status}</Badge>
            </InfoTile>
            <InfoTile label="Payment">
              <Badge className={paymentStatusClassMap[order.payment_status] || fallbackStatusClass}>{order.payment_status}</Badge>
            </InfoTile>
            <InfoTile label="Total Amount">
              <p className="font-semibold text-gray-950">Rs. {order.total_amount}</p>
            </InfoTile>
            <InfoTile label="Items">
              <p className="font-semibold text-gray-950">{order.items.length}</p>
            </InfoTile>
          </div>

          <div className="space-y-3 border-t border-gray-100 p-4 md:p-5">
            {order.items.map((item) => (
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
        </article>
      ))}

      <div ref={deliveredRef} className="py-4 text-center text-sm text-gray-500">
        {isFetchingNextDelivered
          ? "Loading more delivered orders..."
          : hasNextDelivered
            ? "Scroll down to load more"
            : "No more delivered orders"}
      </div>
    </div>
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

export default DeliveredOrders;
