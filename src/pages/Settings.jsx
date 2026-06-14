import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInfiniteOrders } from "@/hooks/useOrders";
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
import StatusPanel from "@/components/common/StatusPanel";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [reviewForm, setReviewForm] = useState({}); // { [variantId]: { rating, comment } }

  const { reset } = useForm();
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
          {isLoading ? (
            <StatusPanel
              type="loading"
              title="Loading Orders"
              message="Fetching your order history."
            />
          ) : isError ? (
            <StatusPanel
              type="error"
              title="Failed To Load Orders"
              message="Please refresh the page and try again."
              action={(
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Refresh Page
                </button>
              )}
            />
          ) : orders.length === 0 ? (
            <StatusPanel
              type="empty"
              title="No Orders Yet"
              message="Start shopping to see your order history here."
              action={(
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Shopping
                </button>
              )}
            />
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
          {isLoadingDelivered ? (
            <StatusPanel
              type="loading"
              title="Loading Delivered Orders"
              message="Fetching your delivered order history."
            />
          ) : isErrorDelivered ? (
            <StatusPanel
              type="error"
              title="Failed To Load Delivered Orders"
              message="Please refresh the page and try again."
              action={(
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Refresh Page
                </button>
              )}
            />
          ) : deliveredOrders.length === 0 ? (
            <StatusPanel
              type="empty"
              title="No Delivered Orders Yet"
              message="Once your orders are delivered, you will be able to review them here."
              action={(
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Products
                </button>
              )}
            />
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
