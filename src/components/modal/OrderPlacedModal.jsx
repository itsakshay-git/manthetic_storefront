// components/modal/OrderPlacedModal.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";

const OrderPlacedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          {/* Confetti */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white p-8 rounded-2xl text-center shadow-2xl max-w-sm w-full relative"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>

            <h2 className="text-xl font-bold mb-6">
              🎉 Order placed successfully!
            </h2>

            <div className="flex justify-center gap-4">
              <Link to="/" onClick={onClose}>
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
                  Home
                </button>
              </Link>
              <Link to="/setting" onClick={onClose}>
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
                  Orders
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderPlacedModal;
