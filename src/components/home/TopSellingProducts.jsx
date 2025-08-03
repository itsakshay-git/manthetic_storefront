import { useState } from "react";
import { Star } from "lucide-react";
import product1 from "@/assets/images/product1.jpg";
import product2 from "@/assets/images/product2.jpg";
import product3 from "@/assets/images/product3.jpg";
import product4 from "@/assets/images/product4.jpg";

const productData = [
  {
    id: 1,
    title: "Wine Red Shirt",
    price: "₹899",
    rating: 4.5,
    image: product1,
  },
  {
    id: 2,
    title: "Khaki Overshirt",
    price: "₹1,099",
    rating: 4.6,
    image: product2,
  },
  {
    id: 3,
    title: "Dark Olive Shirt",
    price: "₹1,299",
    rating: 4.3,
    image: product3,
  },
  {
    id: 4,
    title: "Tapered Grey Pants",
    price: "₹1,599",
    rating: 4.7,
    image: product4,
  },
    {
    id: 5,
    title: "Wine Red Shirt",
    price: "₹899",
    rating: 4.5,
    image: product1,
  },
  {
    id: 6,
    title: "Khaki Overshirt",
    price: "₹1,099",
    rating: 4.6,
    image: product2,
  },
  {
    id: 7,
    title: "Dark Olive Shirt",
    price: "₹1,299",
    rating: 4.3,
    image: product3,
  },
  {
    id: 8,
    title: "Tapered Grey Pants",
    price: "₹1,599",
    rating: 4.7,
    image: product4,
  },
];

const TopSellingProducts = () => {
  const [filter, setFilter] = useState("new");

  return (
    <section className="w-full px-4 md:px-32 py-20">
      <div className="flex justify-center items-center flex-col mb-20">
        <h2 className="text-2xl md:text-5xl font-bold text-gray-800">
          Top Selling Products
        </h2>
        <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-full mt-14">
          Shop Now
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-800 truncate">
                {product.title}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-green-600 font-semibold">
                  {product.price}
                </span>
                <span className="flex items-center text-sm text-yellow-500">
                  <Star size={14} className="fill-yellow-500" />
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
