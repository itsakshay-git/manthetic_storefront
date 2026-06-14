import React from "react";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";

const iconMap = {
  error: AlertCircle,
  loading: Loader2,
  empty: ShoppingBag,
};

const toneMap = {
  error: "bg-red-100 text-red-500",
  loading: "bg-gray-100 text-green-600",
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
  const iconClassName = type === "loading" ? "w-10 h-10 animate-spin" : "w-10 h-10";

  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${toneMap[type]}`}>
        <Icon className={iconClassName} />
      </div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
      {message && <p className="text-gray-500 max-w-md mb-4">{message}</p>}
      {action}
    </div>
  );
};

export default StatusPanel;
