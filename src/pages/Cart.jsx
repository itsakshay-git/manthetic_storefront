import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";

import StatusPanel from "@/components/common/StatusPanel";
import useCart from "@/hooks/useCart";

const formatPrice = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

export default function Cart() {
  const token = useSelector((state) => state.auth.token);
  const { cart, loading, updateQuantity, removeItem } = useCart(token);

  if (loading) {
    return (
      <main className="px-6 py-8 md:px-8 lg:px-32 md:py-12">
        <StatusPanel
          type="loading"
          title="Loading Cart"
          message="Getting your cart items ready."
        />
      </main>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.selected_price) * Number(item.quantity || 0),
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  return (
    <main className="bg-white px-6 py-8 md:px-8 lg:px-32 lg:py-10">
      <div className="mx-auto">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Shopping Bag
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-950 md:text-5xl">
              Your Cart
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Review your Manthetic picks before checkout. Keep what fits the plan, remove what does not.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-950"
          >
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-6">
            <StatusPanel
              type="empty"
              title="Your Cart Is Empty"
              message="Add a few everyday staples to your cart before checkout."
              action={(
                <Link
                  to="/products"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
                >
                  Shop Products
                </Link>
              )}
            />
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                <span>{itemCount} {itemCount === 1 ? "item" : "items"} in your bag</span>
                <span className="hidden sm:inline">Prices and sizes are checked at checkout</span>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>

            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
          </section>
        )}
      </div>
    </main>
  );
}

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const quantity = Number(item.quantity || 0);
  const lineTotal = Number(item.selected_price || 0) * quantity;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center md:p-5">
        <Link
          to={`/product/${item.variant_id}`}
          className="group grid grid-cols-[104px_1fr] gap-4 rounded-xl outline-none transition focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 sm:grid-cols-[128px_1fr] sm:items-center"
          aria-label={`View ${item.product_title}`}
        >
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
            <img
              src={item.images?.[0] || "/placeholder.png"}
              alt={item.product_title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              {item.variant_name}
            </p>
            <h2 className="mt-1 text-base font-semibold text-gray-950 transition group-hover:text-green-700 md:text-lg">
              {item.product_title}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="rounded-full bg-gray-100 px-3 py-1">Size {item.selected_size}</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">{formatPrice(item.selected_price)}</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          <QuantityControl
            quantity={quantity}
            onDecrease={() => updateQuantity(item.id, Math.max(1, quantity - 1))}
            onIncrease={() => updateQuantity(item.id, quantity + 1)}
          />
          <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
            <p className="font-semibold text-gray-950">{formatPrice(lineTotal)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-red-600 transition hover:bg-red-50"
              aria-label={`Remove ${item.product_title} from cart`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex min-h-11 items-center rounded-full bg-gray-50 px-2 ring-1 ring-gray-200">
    <button
      type="button"
      onClick={onDecrease}
      disabled={quantity <= 1}
      className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
      aria-label="Decrease quantity"
    >
      <Minus className="h-4 w-4" />
    </button>
    <span className="w-8 text-center text-sm font-semibold text-gray-950">{quantity}</span>
    <button
      type="button"
      onClick={onIncrease}
      className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition hover:bg-white"
      aria-label="Increase quantity"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

const OrderSummary = ({ subtotal, shipping, total }) => (
  <aside className="lg:sticky lg:top-6">
    <div className="rounded-2xl border border-gray-200 bg-gray-950 p-5 text-white shadow-sm md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
          <ShoppingBag className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-white/60">Checkout</p>
          <h2 className="text-2xl font-bold">Order Summary</h2>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Shipping" value={formatPrice(shipping)} />
        <div className="border-t border-white/15 pt-3">
          <SummaryRow label="Total" value={formatPrice(total)} strong />
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-green-500 hover:text-white"
      >
        Proceed To Checkout
      </Link>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/8 p-3 text-sm text-white/70 ring-1 ring-white/10">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
        Shipping is calculated here as a flat storefront estimate and confirmed during checkout.
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

