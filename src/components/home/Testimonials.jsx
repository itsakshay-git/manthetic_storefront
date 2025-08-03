import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import user from "@/assets/images/User.png";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    rating: 5,
    image: user,
    review:
      "Absolutely love the quality and fit! Manthetic is my go-to for trendy fashion.",
  },
  {
    id: 2,
    name: "Ravi Patel",
    rating: 4,
    image: user,
    review:
      "Great service and fast delivery. The hoodie I bought is super comfy!",
  },
  {
    id: 3,
    name: "Nikhil Verma",
    rating: 5,
    image: user,
    review:
      "Stylish, affordable, and top-notch material. Highly recommended.",
  },
    {
    id: 4,
    name: "Amit Sharma",
    rating: 5,
    image: user,
    review:
      "Absolutely love the quality and fit! Manthetic is my go-to for trendy fashion.",
  },
  {
    id: 5,
    name: "Ravi Patel",
    rating: 4,
    image: user,
    review:
      "Great service and fast delivery. The hoodie I bought is super comfy!",
  },
  {
    id: 6,
    name: "Nikhil Verma",
    rating: 5,
    image: user,
    review:
      "Stylish, affordable, and top-notch material. Highly recommended.",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full px-4 md:px-32 py-10 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
        What Our Customers Say
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-20"
        >
          {testimonials.map((user) => (
            <SwiperSlide key={user.id}>
              <div className="p-6 rounded-xl shadow-md border border-gray-300 bg-white h-full mb-24">
                <p className="text-sm text-gray-600 leading-relaxed mb-10">
                  {user.review}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      {user.name}
                    </h4>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: user.rating }).map((_, idx) => (
                        <Star key={idx} size={16} className="fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-6 mt-4 z-10">
          <button className="custom-swiper-button-prev bg-green-400 hover:bg-black text-white px-4 py-2 rounded-full shadow">
            &#8592;
          </button>
          <button className="custom-swiper-button-next bg-green-400 hover:bg-black text-white px-4 py-2 rounded-full shadow">
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
