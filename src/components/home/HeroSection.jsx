import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.jpg";
import hero4 from "@/assets/images/hero4.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-8 md:px-8 md:py-10 lg:px-32 lg:py-12">
      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-start">
        {/* section 1 */}
        <div className="w-full flex-1 space-y-4 lg:min-h-[520px]">
          <div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
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
              className="mt-5 cursor-pointer rounded-full bg-green-500 px-4 py-2 text-sm text-white hover:bg-black"
            >
              Shop Now
            </button>
          </div>

          {/* Desktop images (absolute) */}
          <div className="hidden lg:block">
            <img
              src={hero1}
              alt="hero product"
              className="absolute bottom-28 left-[140px] z-10 h-40 w-28 rounded-lg object-cover"
            />
            <img
              src={hero2}
              alt="hero product"
              className="absolute bottom-56 left-60 h-44 w-44 rounded-lg object-cover"
            />
            <img
              src={hero3}
              alt="hero model"
              className="absolute bottom-40 left-96 h-48 w-32 rounded-lg object-cover"
            />
          </div>

          {/* Tablet images (contained) */}
          <div className="mt-6 hidden grid-cols-[0.82fr_1fr_0.82fr] items-end gap-3 sm:grid lg:hidden">
            <img
              src={hero1}
              alt="hero product"
              className="h-40 w-full rounded-xl object-cover"
            />
            <img
              src={hero2}
              alt="hero product"
              className="h-48 w-full rounded-xl object-cover"
            />
            <img
              src={hero3}
              alt="hero model"
              className="h-44 w-full rounded-xl object-cover"
            />
          </div>

          {/* Mobile images (stacked) */}
          <div className="mt-6 flex justify-center gap-3 sm:hidden">
            <img
              src={hero1}
              alt="hero product"
              className="h-32 w-24 rounded-lg object-cover"
            />
            <img
              src={hero2}
              alt="hero product"
              className="h-28 w-28 rounded-lg object-cover"
            />
            <img
              src={hero3}
              alt="hero model"
              className="h-36 w-24 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full flex-1 md:mx-auto md:max-w-2xl lg:mx-0 lg:max-w-md">
          <div className="overflow-hidden">
            <div className="relative">
              <img
                src={hero4}
                alt="featured"
                className="h-[340px] w-full rounded-2xl object-cover sm:h-[420px] md:h-[460px] lg:h-auto"
              />
              <button
                onClick={() => navigate(`/products?is_best_selling=true`)}
                className="absolute bottom-4 left-4 cursor-pointer rounded-full border border-white px-4 py-2 text-white"
              >
                Best Seller
              </button>
            </div>
            <div className="px-0 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Signature Comfort Fit
              </h3>
              <p className="mt-2 text-sm text-gray-600">
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
