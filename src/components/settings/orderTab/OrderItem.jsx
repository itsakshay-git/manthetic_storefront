import React from "react";

const OrderItem = ({ item }) => {
  return (
    <div className="p-3 bg-gray-50 rounded flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex gap-4">
        <div>
          <img
            src={item.images[0]}
            alt={item.variant_name}
            className="w-10 h-10 object-center object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{item.product_name}</p>
          <p className="text-gray-500 text-sm">Variant: {item.variant_name}</p>
        </div>
      </div>
      <div className="flex gap-4 text-sm mt-2 md:mt-0">
        <span>Size: {item.size}</span>
        <span>Qty: {item.quantity}</span>
        <span>Price: ₹{item.price}</span>
      </div>
    </div>
  );
};

export default OrderItem;
