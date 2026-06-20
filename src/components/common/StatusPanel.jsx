import React from "react";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";

const iconMap = {
  error: AlertCircle,
  loading: Loader2,
  empty: ShoppingBag,
};

const toneMap = {
  error: "bg-amber-50 text-amber-600",
  loading: "bg-gray-100 text-gray-950",
  empty: "bg-gray-100 text-gray-400",
};

const StatusPanel = ({
  type = "empty",
  title,
  message,
  action,
  className = "",
}) => {
  const Icon = iconMap[type] || ShoppingBag;
  const iconClassName = type === "loading" ? "h-10 w-10 animate-spin" : "h-10 w-10";

  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-14 text-center ${className}`}>
      <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${toneMap[type]}`}>
        <Icon className={iconClassName} />
      </div>
      {title && <h3 className="mb-2 text-lg font-semibold text-gray-950">{title}</h3>}
      {message && <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-500">{message}</p>}
      {action}
    </div>
  );
};

export default StatusPanel;
