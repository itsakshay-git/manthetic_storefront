import { LockKeyhole, Package, Star, Truck } from "lucide-react";

export const accountTabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "delivered", label: "Delivered", icon: Truck },
  { id: "review", label: "Reviews", icon: Star },
  { id: "password", label: "Password", icon: LockKeyhole },
];

export const accountPrimaryActionClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2";
