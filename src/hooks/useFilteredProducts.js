import { useQuery } from "@tanstack/react-query";
import API from "../lib/axios";
import { queryKeys } from "@/lib/queryKeys";

const fetchProducts = async ({ queryKey }) => {
  const [
    _key,
    { search, category, in_stock, out_of_stock, is_best_selling, size, page },
  ] = queryKey;

  const res = await API.get(`/products`, {
    params: {
      search,
      category,
      in_stock,
      out_of_stock,
      is_best_selling,
      size,
      page,
    },
  });
  return res.data; // contains products, totalPages, page, totalCount
};

export default function useFilteredProducts({
  search = "",
  category = "",
  in_stock = false,
  out_of_stock = false,
  is_best_selling = false,
  size = "",
  page = 1,
}) {
  const params = { search, category, in_stock, out_of_stock, is_best_selling, size, page };

  return useQuery({
    queryKey: queryKeys.products(params),
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
}
