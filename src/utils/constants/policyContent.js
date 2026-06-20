import { PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";

export const policies = {
  "/shipping": {
    eyebrow: "Shipping Policy",
    title: "Clear delivery, no guesswork.",
    intro:
      "We pack Manthetic orders with the same care we expect from the clothes themselves: clean, reliable, and easy to track from checkout to doorstep.",
    icon: Truck,
    summary: [
      { label: "Dispatch", value: "1-2 business days" },
      { label: "Delivery", value: "3-7 business days" },
      { label: "Updates", value: "Shared by email or SMS" },
    ],
    sections: [
      {
        heading: "How Orders Move",
        body:
          "Once an order is placed, we verify the item, pack it, and hand it to the delivery partner. You will receive tracking details once the shipment is active.",
      },
      {
        heading: "Delivery Windows",
        body:
          "Most metro deliveries arrive faster, while remote locations can take a little longer. Festival periods, weather, and courier delays may add time, but we keep the order status updated.",
      },
      {
        heading: "Address Checks",
        body:
          "Please review your phone number, pin code, and address before placing the order. If something looks wrong, contact support quickly so we can help before dispatch.",
      },
    ],
  },
  "/returns": {
    eyebrow: "Return Policy",
    title: "A simple return flow for unworn pieces.",
    intro:
      "If the fit is not right, we want the fix to be straightforward. Keep the tags intact, keep the item fresh, and reach out within the return window.",
    icon: RotateCcw,
    summary: [
      { label: "Window", value: "7 days from delivery" },
      { label: "Condition", value: "Unused with tags" },
      { label: "Resolution", value: "Exchange or refund review" },
    ],
    sections: [
      {
        heading: "What Qualifies",
        body:
          "Items should be unused, unwashed, and returned with original tags and packaging. Products with stains, perfume, damage, or missing tags may not pass review.",
      },
      {
        heading: "Starting A Return",
        body:
          "Email support with your order ID, item name, and reason for return. Photos help us resolve damaged or incorrect-item cases faster.",
      },
      {
        heading: "Refund Timing",
        body:
          "After the item reaches us and passes quality review, eligible refunds are processed to the original payment method. Bank processing time may vary.",
      },
    ],
  },
  "/terms": {
    eyebrow: "Terms Of Use",
    title: "The ground rules for shopping Manthetic.",
    intro:
      "These terms keep the storefront fair, practical, and transparent for everyone using Manthetic.",
    icon: PackageCheck,
    summary: [
      { label: "Pricing", value: "Shown before checkout" },
      { label: "Orders", value: "Subject to availability" },
      { label: "Accounts", value: "User responsibility" },
    ],
    sections: [
      {
        heading: "Product Information",
        body:
          "We try to keep product photos, prices, sizes, and stock details accurate. Small differences in color can happen because of lighting, screens, and fabric batches.",
      },
      {
        heading: "Order Acceptance",
        body:
          "An order may be cancelled if inventory changes, payment fails, address details are incomplete, or activity appears unusual. If payment was captured, eligible refunds are handled through support.",
      },
      {
        heading: "Using The Storefront",
        body:
          "Please keep your login details private and use the site only for lawful purchases. Do not attempt to misuse checkout, reviews, accounts, or backend services.",
      },
    ],
  },
  "/privacy": {
    eyebrow: "Privacy Policy",
    title: "Your data should feel handled, not harvested.",
    intro:
      "We collect only what helps us run the store: account access, order handling, delivery support, and a smoother shopping experience.",
    icon: ShieldCheck,
    summary: [
      { label: "Account", value: "Name and email" },
      { label: "Orders", value: "Address and items" },
      { label: "Security", value: "Protected access" },
    ],
    sections: [
      {
        heading: "What We Collect",
        body:
          "Manthetic may store account details, cart activity, wishlist items, reviews, addresses, and order history so the shopping experience works properly.",
      },
      {
        heading: "How It Is Used",
        body:
          "Your information is used to authenticate your account, process orders, manage support, improve product discovery, and keep basic records for store operations.",
      },
      {
        heading: "Your Choices",
        body:
          "You can update account details from your profile where available. For help with account or order data, contact support and include the email linked to your account.",
      },
    ],
  },
};
