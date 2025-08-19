import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInfiniteOrders } from "@/hooks/useOrders";
import dayjs from "dayjs";
import userImage from "../assets/images/userImage.png";
import { useInView } from "react-intersection-observer";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { useForm } from "react-hook-form";
import { useInfiniteDeliveredOrders } from "@/hooks/useInfiniteDeliveredOrders";
import { useAddReview } from "@/hooks/useAddReview";
import toast from "react-hot-toast";
import DeliveredOrders from "@/components/settings/deliveredTab/DeliveredOrders";
import Orders from "@/components/settings/orderTab/Orders";
import ProfileCard from "@/components/settings/profileCard/ProfileCard";
import ChangePassword from "@/components/settings/changePassword/ChangePassword";
import UserReviews from "@/components/settings/reviewTab/UserReviews";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("orders");
  const [reviewForm, setReviewForm] = useState({}); // { [variantId]: { rating, comment } }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const addReview = useAddReview();
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, } = useInfiniteOrders(user?.id);
  const { ref, inView } = useInView();


  useEffect(() => {
    if (deliveredInView && hasNextDelivered) {
      fetchNextDelivered();
    }
  }, [deliveredInView, hasNextDelivered, fetchNextDelivered]);

  useEffect(() => {
    if (updatePassword.isSuccess) {
      reset(); // clear form after success
    }
  }, [updatePassword.isSuccess, reset]);

  // Intersection Observer to detect when to load next page
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);



  const deliveredOrders = deliveredData?.pages.flatMap(p => p.orders) || [];
  const orders = data?.pages.flatMap((page) => page.orders) || [];


  // Flatten all pages into a single array

  const handleChangeReview = (variantId, field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId],
        [field]: value,
      },
    }));
  };
  const handleSubmitReview = (orderId, item) => {
    const { rating, comment } = reviewForm[item.id] || {};
    if (!rating || !comment) return toast.error("Please fill rating and comment");
    addReview.mutate({
      product_id: item.product_id,
      variant_id: item.variant_id,
      rating,
      comment,
    });
  };

  if (isLoading) return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow p-6 mt-5 rounded-2xl">
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow p-6 mt-5 rounded-2xl">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Orders</h3>
        <p className="text-gray-500 max-w-md mb-4">
          We encountered an error while loading your orders. Please try refreshing the page or contact support if the issue persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );


  return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow p-6 mt-5 rounded-2xl space-y-6">
      {/* Profile Card */}
      <ProfileCard user={user} />


      {/* Tabs */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex justify-center items-center min-w-max gap-6 border-b border-b-gray-300 mb-6 text-sm font-medium px-2">
          <button
            onClick={() => setActiveTab("password")}
            className={`pb-2 whitespace-nowrap ${activeTab === "password"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
              }`}
          >
            Change Password
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 whitespace-nowrap ${activeTab === "orders"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-500"
              }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`pb-2 whitespace-nowrap ${activeTab === "delivered"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-500"
              }`}
          >
            Delivered Orders
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`pb-2 whitespace-nowrap ${activeTab === "review"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-500"
              }`}
          >
            My Reviews
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 max-w-md mb-4">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <Orders
              orders={orders}
              refProp={ref}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
          )}
        </>
      )}

      {activeTab === "delivered" && (
        <>
          {deliveredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Delivered Orders Yet</h3>
              <p className="text-gray-500 max-w-md mb-4">
                You don't have any delivered orders yet. Once your orders are delivered, you'll be able to review them here.
              </p>
              <button
                onClick={() => window.location.href = '/products'}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <DeliveredOrders
              deliveredOrders={deliveredOrders}
              reviewForm={reviewForm}
              handleChangeReview={handleChangeReview}
              handleSubmitReview={handleSubmitReview}
              addReview={addReview}
              deliveredRef={deliveredRef}
              isLoadingDelivered={isLoadingDelivered}
              isErrorDelivered={isErrorDelivered}
              isFetchingNextDelivered={isFetchingNextDelivered}
              hasNextDelivered={hasNextDelivered}
            />
          )}
        </>
      )}


      {/* Password Tab */}
      {activeTab === "password" && <ChangePassword updatePassword={updatePassword} />}
      {activeTab === "review" && <UserReviews />}
    </div>
  );
};

export default Settings;
