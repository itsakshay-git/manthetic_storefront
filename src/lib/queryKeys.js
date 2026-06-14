export const queryKeys = {
  addresses: (userId) => ["addresses", userId],
  cart: (token) => ["cart", token],
  cartRoot: () => ["cart"],
  categories: () => ["categories"],
  deliveredOrdersRoot: () => ["deliveredOrders"],
  deliveredOrders: (userId) => ["deliveredOrders", userId],
  orders: (userId) => ["orders", userId],
  products: (params) => ["products", params],
  relatedProducts: (variantId) => ["relatedProducts", variantId],
  userReviews: (userId) => ["userReviews", userId],
  variant: (id) => ["variant", id],
  wishlist: (token) => ["wishlist", token],
};
