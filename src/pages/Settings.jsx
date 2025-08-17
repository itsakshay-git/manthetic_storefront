import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInfiniteOrders } from "@/hooks/useOrders";
import dayjs from "dayjs";
import userImage from "../assets/images/userImage.png";
import { useInView } from "react-intersection-observer";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { useForm } from "react-hook-form";
import { useInfiniteDeliveredOrders } from "@/hooks/useInfiniteDeliveredOrders";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("orders");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const updatePassword = useUpdatePassword();

  const {
  data: deliveredData,
  fetchNextPage: fetchNextDelivered,
  hasNextPage: hasNextDelivered,
  isFetchingNextPage: isFetchingNextDelivered,
  isLoading: isLoadingDelivered,
  isError: isErrorDelivered,
} = useInfiniteDeliveredOrders(user?.id);

const { ref: deliveredRef, inView: deliveredInView } = useInView();
useEffect(() => {
  if (deliveredInView && hasNextDelivered) {
    fetchNextDelivered();
  }
}, [deliveredInView, hasNextDelivered, fetchNextDelivered]);

const deliveredOrders = deliveredData?.pages.flatMap(p => p.orders) || [];

useEffect(() => {
  if (updatePassword.isSuccess) {
    reset(); // clear form after success
  }
}, [updatePassword.isSuccess, reset]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteOrders(user?.id);

  // Intersection Observer to detect when to load next page
  const { ref, inView } = useInView();
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to fetch orders.</div>;

  // Flatten all pages into a single array
  const orders = data?.pages.flatMap((page) => page.orders) || [];

  return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow p-6 mt-5 rounded-2xl space-y-6">
      {/* Profile Card */}
      <div className="relative bg-white rounded-xl p-6 flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-1 bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition"
        >
          Sign Out
        </button>
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4">
          <img src={userImage} alt={user?.name} className="rounded-full" />
        </div>
        <p className="font-semibold text-lg">{user?.name || "Akshay Dhongade"}</p>
        <p className="text-gray-500">{user?.email || "akshay@gmail.com"}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 border-b border-b-gray-300 mb-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab("password")}
          className={`pb-2 ${
            activeTab === "password" ? "border-b border-black text-black" : "text-gray-500"
          }`}
        >
          Change Password
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-2 ${
            activeTab === "orders" ? "border-b border-green-500 text-green-500" : "text-gray-500"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`pb-2 ${
            activeTab === "delivered" ? "border-b border-green-500 text-green-500" : "text-gray-500"
          }`}
        >
          Delivered Orders
        </button>
          <button
          onClick={() => setActiveTab("orders")}
          className={`pb-2 ${
            activeTab === "orders" ? "border-b border-green-500 text-green-500" : "text-gray-500"
          }`}
        >
          My Reviews
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-600">Order #{order.id}</span>
                <span className="text-sm text-gray-500">
                  {dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "CONFIRMED"
                        ? "bg-green-100 text-orange-200"
                        : order.status === "SHIPPED"
                        ? "bg-green-300 text-white"
                        : order.status === "DELIVERED"
                        ? "bg-green-900 text-white"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Payment</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.payment_status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : order.payment_status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.payment_status === "FAILED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p>₹{isNaN(Number(order.total_amount)) ? 0 : order.total_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p>{order.items.length}</p>
                </div>
              </div>

              {/* List of items */}
              <div className="space-y-2 border-t border-t-gray-300 pt-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded flex flex-col md:flex-row md:justify-between md:items-center"
                  >
                    <div className="flex gap-4">
                      <div>
                        <img
                          src={item.images[0]}
                          alt={item.variant_name}
                          className="w-10 h-10 object-center object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.product_name}</p>
                        <p className="text-gray-500 text-sm">Variant: {item.variant_name}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm mt-2 md:mt-0">
                      <span>Size: {item.size}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Loader / Trigger for next page */}
          <div ref={ref} className="text-center py-4 text-gray-500">
            {isFetchingNextPage
              ? "Loading more orders..."
              : hasNextPage
              ? "Scroll down to load more"
              : "No more orders"}
          </div>
        </div>
      )}

      {activeTab === "delivered" && (
  <div className="space-y-4">
    {isLoadingDelivered && <p>Loading delivered orders...</p>}
    {isErrorDelivered && <p className="text-red-500">Failed to fetch delivered orders.</p>}
    
    {deliveredOrders.map(order => (
      <div key={order.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-blue-600">Order #{order.id}</span>
          <span className="text-sm text-gray-500">
            {dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-white">
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment</p>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              order.payment_status === "PAID" ? "bg-green-100 text-green-800" :
              order.payment_status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
              order.payment_status === "FAILED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
            }`}>
              {order.payment_status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p>₹{order.total_amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Items</p>
            <p>{order.items.length}</p>
          </div>
        </div>

        <div className="space-y-2 border-t border-t-gray-300 pt-2">
          {order.items.map(item => (
            <div key={item.id} className="p-3 bg-gray-50 rounded flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex gap-4">
                <img src={item.images[0]} alt={item.variant_name} className="w-10 h-10 object-contain"/>
                <div>
                  <p className="text-sm font-semibold">{item.product_name}</p>
                  <p className="text-gray-500 text-sm">Variant: {item.variant_name}</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm mt-2 md:mt-0">
                <span>Size: {item.size}</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: ₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
    ))}

    {/* Loader / Infinite Scroll */}
    <div ref={deliveredRef} className="text-center py-4 text-gray-500">
      {isFetchingNextDelivered
        ? "Loading more delivered orders..."
        : hasNextDelivered
        ? "Scroll down to load more"
        : "No more delivered orders"}
    </div>
  </div>
)}

      {/* Password Tab */}
      {activeTab === "password" && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>

          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) => updatePassword.mutate(data))}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                {...register("currentPassword", { required: "Current password is required" })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={updatePassword.isLoading}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {updatePassword.isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
