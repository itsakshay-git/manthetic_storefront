import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddresses, useAddAddress, useDeleteAddress } from "@/hooks/useAddresses";
import { useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { usePlaceOrder } from "@/hooks/useOrders";
import OrderPlacedModal from "@/components/modal/OrderPlacedModal";
import StatusPanel from "@/components/common/StatusPanel";
import { Link } from "react-router-dom";

// Zod schema for validation
const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  street: z.string().min(1, "Street is required"),
  phone: z.string().min(1, "Phone is required")
});

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: addresses = [], isLoading, isError } = useAddresses(user?.id);
  const addAddressMutation = useAddAddress(user?.id);
  const deleteAddressMutation = useDeleteAddress(user?.id);
  const token = useSelector((state) => state.auth.token);
  const placeOrderMutation = usePlaceOrder(token);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addressSchema)
  });

  const onSubmit = (data) => {
    addAddressMutation.mutate(
      data,
      { onSuccess: () => reset() }
    );
  };


  const handlePlaceOrder = () => {
    if (!selectedAddress) return;

    placeOrderMutation.mutate({
      address_id: selectedAddress,
      payment_method: paymentMethod,
    }, {
      onSuccess: () => {
        setShowModal(true);
      }
    });
  };

  const cannotPlaceOrder = placeOrderMutation.isPending || !selectedAddress;

  if (!user?.id) {
    return (
      <div className="px-6 md:px-32 py-8">
        <StatusPanel
          type="empty"
          title="Login Required"
          message="Please log in before choosing an address and placing an order."
          action={(
            <Link to="/login" className="inline-flex bg-black px-5 py-2 rounded-full text-white">
              Go To Login
            </Link>
          )}
        />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-32 grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Add Address Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-gray-300 p-6 rounded-xl shadow">
        <input placeholder="City" {...register("city")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        <input placeholder="Zipcode" {...register("zipcode")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>}

        <input placeholder="Country" {...register("country")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

        <input placeholder="State" {...register("state")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <input placeholder="Street" {...register("street")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.street && <p className="text-red-500">{errors.street.message}</p>}

        <input placeholder="Phone" {...register("phone")} className="w-full border border-gray-300 p-2 rounded" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <button
          type="submit"
          disabled={addAddressMutation.isPending}
          className={`bg-black text-white px-4 py-2 rounded-full w-full cursor-pointer 
        ${addAddressMutation.isPending ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {addAddressMutation.isPending ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Select Address + Payment */}
      <div className="space-y-6">
        <div>
          <h2 className="font-bold mb-2">Select Address</h2>
          {isLoading ? (
            <StatusPanel
              type="loading"
              title="Loading Addresses"
              message="Fetching your saved delivery addresses."
              className="py-10"
            />
          ) : isError ? (
            <StatusPanel
              type="error"
              title="Failed To Load Addresses"
              message="Please refresh the page and try again."
              className="py-10"
            />
          ) : addresses.length === 0 ? (
            <StatusPanel
              type="empty"
              title="No Saved Addresses"
              message="Save a delivery address first, then select it for checkout."
              className="py-10"
            />
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`p-4 border border-gray-300 rounded-2xl cursor-pointer flex justify-between items-center ${selectedAddress === addr.id ? "border-green-500" : "border-gray-300"
                    }`}
                >
                  <div>
                    <p>{addr.street}, {addr.city}, {addr.state}, {addr.country}, {addr.zipcode}</p>
                    <p className="text-sm text-gray-500">{addr.phone}</p>
                  </div>
                  <button
                    type="button"
                    disabled={deleteAddressMutation.isPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAddressMutation.mutate(addr.id);
                    }}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment */}
        <div>
          <h2 className="font-bold mb-2">Payment</h2>
          <div className="flex space-x-4">
            <label className={`border border-gray-300 px-4 py-2 rounded-full cursor-pointer ${paymentMethod === "cod" ? "border-green-500" : ""}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="hidden" />
              Cash on Delivery
            </label>
            <label className={`border border-gray-300 px-4 py-2 rounded-full cursor-pointer ${paymentMethod === "online" ? "border-green-500" : ""}`}>
              <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="hidden" />
              Razorpay
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={cannotPlaceOrder}
          className={`px-4 py-2 rounded-full w-full cursor-pointer ${
            cannotPlaceOrder
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-green-600"
          }`}
        >
          {placeOrderMutation.isPending
            ? "Placing Order..."
            : selectedAddress
              ? "Place Order"
              : "Select Address To Place Order"}
        </button>
      </div>

      <OrderPlacedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Checkout;
