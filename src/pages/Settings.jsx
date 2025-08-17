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

if (isLoading) return <div className="p-6">Loading...</div>;
if (isError) return <div className="p-6 text-red-500">Failed to fetch orders.</div>;


  return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow p-6 mt-5 rounded-2xl space-y-6">
      {/* Profile Card */}
      <ProfileCard user={user}/>


      {/* Tabs */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex justify-center items-center min-w-max gap-6 border-b border-b-gray-300 mb-6 text-sm font-medium px-2">
          <button
            onClick={() => setActiveTab("password")}
            className={`pb-2 whitespace-nowrap ${
              activeTab === "password"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Change Password
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-500"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={`pb-2 whitespace-nowrap ${
              activeTab === "delivered"
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-500"
            }`}
          >
            Delivered Orders
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`pb-2 whitespace-nowrap ${
              activeTab === "review"
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
        <Orders
          orders={orders}
          refProp={ref}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}

      {activeTab === "delivered" && (
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


      {/* Password Tab */}
      {activeTab === "password" && <ChangePassword updatePassword={updatePassword} />}
      {activeTab === "review" && <UserReviews />}
    </div>
  );
};

export default Settings;
