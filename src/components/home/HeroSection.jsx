import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.jpg";
import hero4 from "@/assets/images/hero4.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-4 py-8 md:px-32 md:py-12">
      <div className="flex flex-col sm:flex-row md:flex-row gap-6 items-start relative">
        
        {/* section 1 */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="text-gray-800">Unleash Your</span>{" "}
              <span
                className="text-gray-800"
                style={{ fontFamily: "Architects Daughter", fontWeight: "lighter" }}
              >
                Fashion
              </span>{" "}
              <br />
              <span className="text-black">Potential</span>
            </h1>
            <button
              onClick={() => navigate(`/products`)}
              className="bg-green-500 text-white text-sm px-4 py-2 rounded-full mt-5 cursor-pointer hover:bg-black"
            >
              Shop Now
            </button>
          </div>

          {/* Desktop images (absolute) */}
          <div className="hidden sm:block md:block">
            <img
              src={hero1}
              alt="hero product"
              className="sm:w-24 sm:h-32 md:w-28 md:h-40 object-cover rounded-lg absolute sm:left-10 sm:bottom-0 md:left-[135px] md:bottom-28 lg:left-[140px] lg:bottom-28 z-10"
            />
            <img
              src={hero2}
              alt="hero product"
              className="sm:w-32 sm:h-32 w-44 h-44 md:w-44 md:h-44 lg:w-44 lg:h-44 object-cover rounded-lg absolute sm:left-28 sm:bottom-28 md:left-60 md:bottom-40 lg:left-60 lg:bottom-56"
            />
            <img
              src={hero3}
              alt="hero model"
              className="sm:w-20 sm:h-40 w-32 h-48 object-cover rounded-lg absolute sm:left-48 sm:bottom-52 md:left-[380px] md:bottom-10 lg:left-96 lg:bottom-40"
            />
          </div>

          {/* Mobile images (stacked) */}
          <div className="flex justify-center gap-3 sm:hidden mt-6">
            <img
              src={hero1}
              alt="hero product"
              className="w-24 h-32 object-cover rounded-lg"
            />
            <img
              src={hero2}
              alt="hero product"
              className="w-28 h-28 object-cover rounded-lg"
            />
            <img
              src={hero3}
              alt="hero model"
              className="w-24 h-36 object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* section 2 */}
        <div className="flex-1 max-w-md mt-8 md:mt-0">
          <div className="overflow-hidden">
            <div className="relative">
              <img
                src={hero4}
                alt="featured"
                className="w-full object-cover rounded-2xl"
              />
              <button
                onClick={() => navigate(`/products?is_best_selling=true`)}
                className="absolute left-4 bottom-4 text-white border border-white rounded-full p-2 px-4 cursor-pointer"
              >
                Best Seller
              </button>
            </div>
            <div className="px-0 py-4">
              <h3 className="font-semibold text-lg text-gray-800">
                Signature Comfort Fit
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                The ultimate in comfort and style. Pair this with confidence to
                make heads turn wherever you go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
