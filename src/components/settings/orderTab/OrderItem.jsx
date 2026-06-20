import React from "react";

const OrderItem = ({ item }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
            <img
              src={item.images[0]}
              alt={item.variant_name}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-950">{item.product_name}</p>
            <p className="mt-1 truncate text-sm text-gray-500">Variant: {item.variant_name}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm sm:min-w-64">
          <Meta label="Size" value={item.size} />
          <Meta label="Qty" value={item.quantity} />
          <Meta label="Price" value={`Rs. ${item.price}`} />
        </div>
      </div>
    </div>
  );
};

const Meta = ({ label, value }) => (
  <div className="rounded-lg bg-white px-2 py-2 text-center ring-1 ring-gray-100">
    <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">{label}</p>
    <p className="mt-1 truncate font-medium text-gray-800">{value}</p>
  </div>
);

export default OrderItem;
