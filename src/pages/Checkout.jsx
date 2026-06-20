import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Banknote, CheckCircle2, CreditCard, Home, MapPin, Phone, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";

import StatusPanel from "@/components/common/StatusPanel";
import OrderPlacedModal from "@/components/modal/OrderPlacedModal";
import useCart from "@/hooks/useCart";
import { useAddresses, useAddAddress, useDeleteAddress } from "@/hooks/useAddresses";
import { usePlaceOrder } from "@/hooks/useOrders";

const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  street: z.string().min(1, "Street is required"),
  phone: z.string().min(1, "Phone is required"),
});

const addressFields = [
  { name: "street", label: "Street", placeholder: "House, street, area", span: "md:col-span-2" },
  { name: "city", label: "City", placeholder: "City" },
  { name: "state", label: "State", placeholder: "State" },
  { name: "zipcode", label: "Zipcode", placeholder: "Postal code" },
  { name: "country", label: "Country", placeholder: "Country" },
  { name: "phone", label: "Phone", placeholder: "Delivery phone", span: "md:col-span-2" },
];

const formatPrice = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

const Checkout = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showModal, setShowModal] = useState(false);

  const { cart } = useCart(token);
  const { data: addresses = [], isLoading, isError } = useAddresses(user?.id);
  const addAddressMutation = useAddAddress(user?.id);
  const deleteAddressMutation = useDeleteAddress(user?.id);
  const placeOrderMutation = usePlaceOrder(token);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.selected_price) * Number(item.quantity || 0),
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  const onSubmit = (data) => {
    addAddressMutation.mutate(data, { onSuccess: () => reset() });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) return;

    placeOrderMutation.mutate({
      address_id: selectedAddress,
      payment_method: paymentMethod,
    }, {
      onSuccess: () => setShowModal(true),
    });
  };

  const cannotPlaceOrder = placeOrderMutation.isPending || !selectedAddress || cart.length === 0;

  if (!user?.id) {
    return (
      <main className="px-6 py-8 md:px-8 lg:px-32 md:py-12">
        <StatusPanel
          type="empty"
          title="Login Required"
          message="Please log in before choosing an address and placing an order."
          action={(
            <Link to="/login" className="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600">
              Go To Login
            </Link>
          )}
        />
      </main>
    );
  }

  return (
    <main className="bg-white px-6 py-8 md:px-8 lg:px-32 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Checkout
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-950 md:text-5xl">
              Delivery Details
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Add a delivery address, pick the one you want to use, and confirm your payment method.
            </p>
          </div>
          <Link
            to="/cart"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-950"
          >
            Back To Cart
          </Link>
        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-white">
                  <Plus className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-950">Add Delivery Address</h2>
                  <p className="mt-1 text-sm text-gray-500">Save it once, select it below.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {addressFields.map((field) => (
                  <div key={field.name} className={field.span || ""}>
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      placeholder={field.placeholder}
                      {...register(field.name)}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={addAddressMutation.isPending}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {addAddressMutation.isPending ? "Saving..." : "Save Address"}
              </button>
            </form>

            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-950">Select Address</h2>
                  <p className="mt-1 text-sm text-gray-500">Choose where this order should arrive.</p>
                </div>
              </div>

              {isLoading ? (
                <StatusPanel type="loading" title="Loading Addresses" message="Fetching your saved delivery addresses." className="py-10" />
              ) : isError ? (
                <StatusPanel type="error" title="Failed To Load Addresses" message="Please refresh the page and try again." className="py-10" />
              ) : addresses.length === 0 ? (
                <StatusPanel type="empty" title="No Saved Addresses" message="Save a delivery address first, then select it for checkout." className="py-10" />
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress === addr.id;
                    return (
                      <div
                        key={addr.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedAddress(addr.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedAddress(addr.id);
                          }
                        }}
                        className={`group rounded-2xl border p-4 text-left outline-none transition focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${
                          isSelected
                            ? "border-green-500 bg-green-50 ring-1 ring-green-200"
                            : "border-gray-200 bg-gray-50 hover:border-gray-950 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Home className={`h-4 w-4 shrink-0 ${isSelected ? "text-green-700" : "text-gray-400"}`} />
                              <p className="font-semibold text-gray-950">
                                {addr.street}, {addr.city}
                              </p>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                              {addr.state}, {addr.country} - {addr.zipcode}
                            </p>
                            <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-500">
                              <Phone className="h-4 w-4" />
                              {addr.phone}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {isSelected && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                            <button
                              type="button"
                              disabled={deleteAddressMutation.isPending}
                              onClick={(event) => {
                                event.stopPropagation();
                                deleteAddressMutation.mutate(addr.id);
                              }}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label="Delete address"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-white">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-950">Payment</h2>
                  <p className="mt-1 text-sm text-gray-500">Select how you want to pay.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <PaymentOption
                  active={paymentMethod === "cod"}
                  title="Cash On Delivery"
                  description="Pay when your order arrives."
                  icon={<Banknote className="h-5 w-5" />}
                  onClick={() => setPaymentMethod("cod")}
                />
                <PaymentOption
                  active={paymentMethod === "online"}
                  title="Razorpay"
                  description="Pay securely online."
                  icon={<CreditCard className="h-5 w-5" />}
                  onClick={() => setPaymentMethod("online")}
                />
              </div>
            </section>
          </div>

          <CheckoutSummary
            itemCount={itemCount}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            cannotPlaceOrder={cannotPlaceOrder}
            isPlacing={placeOrderMutation.isPending}
            hasSelectedAddress={!!selectedAddress}
            onPlaceOrder={handlePlaceOrder}
          />
        </section>
      </div>

      <OrderPlacedModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
};

const PaymentOption = ({ active, title, description, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition ${
      active
        ? "border-green-500 bg-white ring-1 ring-green-200"
        : "border-gray-200 bg-white hover:border-gray-950"
    }`}
  >
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}>
      {icon}
    </span>
    <span>
      <span className="block font-semibold text-gray-950">{title}</span>
      <span className="mt-1 block text-sm text-gray-500">{description}</span>
    </span>
  </button>
);

const CheckoutSummary = ({
  itemCount,
  subtotal,
  shipping,
  total,
  cannotPlaceOrder,
  isPlacing,
  hasSelectedAddress,
  onPlaceOrder,
}) => (
  <aside className="lg:sticky lg:top-6">
    <div className="rounded-2xl border border-gray-200 bg-gray-950 p-5 text-white shadow-sm md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-white/60">Final Step</p>
          <h2 className="text-2xl font-bold">Order Review</h2>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Items" value={itemCount} />
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Shipping" value={formatPrice(shipping)} />
        <div className="border-t border-white/15 pt-3">
          <SummaryRow label="Total" value={formatPrice(total)} strong />
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={cannotPlaceOrder}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
      >
        {isPlacing
          ? "Placing Order..."
          : hasSelectedAddress
            ? "Place Order"
            : "Select Address To Place Order"}
      </button>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/8 p-3 text-sm text-white/70 ring-1 ring-white/10">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
        Orders use your cart items and selected address. You can review everything before confirming.
      </div>
    </div>
  </aside>
);

const SummaryRow = ({ label, value, strong = false }) => (
  <div className={`flex items-center justify-between gap-4 ${strong ? "text-lg font-bold" : "text-white/75"}`}>
    <span>{label}</span>
    <span className={strong ? "text-white" : "text-white/90"}>{value}</span>
  </div>
);

export default Checkout;

