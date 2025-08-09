// components/modal/OrderPlacedModal.jsx
import React from "react";
import { Link } from "react-router-dom";

const OrderPlacedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl text-center shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-6">
          Order placed successfully
        </h2>
        <div className="flex justify-center gap-4">
          <Link to="/" onClick={onClose}>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
              Home
            </button>
          </Link>
          <Link to="#" onClick={onClose}>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedModal;
