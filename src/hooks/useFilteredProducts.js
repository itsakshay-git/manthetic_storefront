import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

const fetchProducts = async ({ queryKey }) => {
 const [_key, { search, category, stock, is_best_selling, size, page }] = queryKey;
 console.log(queryKey)
  const res = await axios.get(`/products`, {
   params: { search, category, stock, is_best_selling, size, page },
  });
  console.log(res)
  return res.data; // contains products, totalPages, page, totalCount
};

export default function useFilteredProducts({
  search = "",
  category = "",
  stock = "",
  is_best_selling = false,
  size = "",
  page = 1,
}) {
  return useQuery({
    queryKey: ["products", { search, category, stock, is_best_selling, size, page }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
}
