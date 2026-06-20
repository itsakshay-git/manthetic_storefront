import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import userImage from "@/assets/images/User.png";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    rating: 5,
    image: userImage,
    review:
      "Absolutely love the quality and fit! Manthetic is my go-to for trendy fashion.",
  },
  {
    id: 2,
    name: "Ravi Patel",
    rating: 4,
    image: userImage,
    review:
      "Great service and fast delivery. The hoodie I bought is super comfy!",
  },
  {
    id: 3,
    name: "Nikhil Verma",
    rating: 5,
    image: userImage,
    review:
      "Stylish, affordable, and top-notch material. Highly recommended.",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    rating: 5,
    image: userImage,
    review:
      "The fit is clean and the fabric feels premium. Easy to wear all week.",
  },
  {
    id: 5,
    name: "Karan Shah",
    rating: 4,
    image: userImage,
    review:
      "Simple styles, good prices, and reliable delivery. I would order again.",
  },
  {
    id: 6,
    name: "Nikhil Verma",
    rating: 5,
    image: userImage,
    review:
      "Stylish, affordable, and top-notch material. Highly recommended.",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-32 py-14 bg-white">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Reviews
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">
            Worn And Loved
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-gray-600">
          A few words from customers who picked Manthetic for fit, comfort, and everyday style.
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
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
          className="pb-4"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
                <div>
                  <div className="mb-5 flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={idx < item.rating ? "fill-yellow-500" : "text-gray-300"}
                        fill={idx < item.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.review}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">Verified customer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="custom-swiper-button-prev flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition hover:bg-black"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="custom-swiper-button-next flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition hover:bg-black"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

