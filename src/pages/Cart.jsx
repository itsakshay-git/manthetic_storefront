import React from "react";
import useCart from "../hooks/useCart";
// import { useSelector } from "react-redux"; // If you store token in Redux

export default function Cart() {
  // const token = useSelector((state) => state.auth.token); // Or from localStorage
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMjA1Nzc0LCJleHAiOjE3NTU3OTc3NzR9.1bOh8Dnuf334mRbxmwVGkpI2BQC5YO1BTFxkFdLwqX0"
  const { cart, loading, updateQuantity, removeItem } = useCart(token);

  if (loading) return <div>Loading...</div>;

  const subtotal = cart.reduce((sum, item) => sum + item.selected_price * item.quantity, 0);
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-8">
      {/* Left: Cart Items */}
      <div className="col-span-2 bg-white border border-gray-300 rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b border-gray-400 py-4">
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]}
                alt={item.product_title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.product_title}</h3>
                <p className="text-gray-500">{item.variant_name}</p>
                <p className="text-gray-500">Size: {item.selected_size}</p>
                <p className="text-sm font-semibold">₹{item.selected_price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white border border-gray-300 rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between font-bold py-2 border-t mt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button className="w-full mt-4 bg-black text-white py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
}
