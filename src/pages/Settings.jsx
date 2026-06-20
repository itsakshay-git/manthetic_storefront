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
import { accountPrimaryActionClass, accountTabs } from "@/utils/constants/accountSettings";


const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [reviewForm, setReviewForm] = useState({});

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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteOrders(user?.id);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (deliveredInView && hasNextDelivered) {
      fetchNextDelivered();
    }
  }, [deliveredInView, hasNextDelivered, fetchNextDelivered]);

  useEffect(() => {
    if (updatePassword.isSuccess) {
      reset();
    }
  }, [updatePassword.isSuccess, reset]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const deliveredOrders = deliveredData?.pages.flatMap((p) => p.orders) || [];
  const orders = data?.pages.flatMap((page) => page.orders) || [];

  const handleChangeReview = (variantId, field, value) => {
    setReviewForm((prev) => ({
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
    <main className="bg-white px-6 py-6 md:px-8 lg:px-32">
      <div className="mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Account
          </p>
          <h1 className="text-3xl font-bold text-gray-950 md:text-5xl">
            Profile Settings
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Manage your profile, follow your orders, and keep your Manthetic account secure.
          </p>
        </div>

        <ProfileCard user={user} />

        <section className="rounded-2xl border border-gray-200 bg-gray-50/70 p-3 shadow-sm md:p-5">
          <div className="overflow-x-auto no-scrollbar">
            <div className="grid min-w-[560px] grid-cols-4 gap-2 rounded-full bg-white p-1 ring-1 ring-gray-200 md:min-w-0">
              {accountTabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition ${
                      isActive
                        ? "bg-gray-950 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-950"
                    }`}
                  >
                    {React.createElement(Icon, { className: "h-4 w-4" })}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 md:mt-6">
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
                        className={accountPrimaryActionClass}
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
                        onClick={() => navigate("/products")}
                        className={accountPrimaryActionClass}
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
                        className={accountPrimaryActionClass}
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
                        onClick={() => navigate("/products")}
                        className={accountPrimaryActionClass}
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

            {activeTab === "password" && <ChangePassword updatePassword={updatePassword} />}
            {activeTab === "review" && <UserReviews />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Settings;

