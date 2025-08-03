import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.jpg";
import hero4 from "@/assets/images/hero4.jpg";

const HeroSection = () => {
  return (
    <section className="w-full px-4 py-8 md:px-32 md:py-12">
      <div className="flex flex-col md:flex-row gap-6 items-start relative">
        <div className="flex-1 space-y-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    <span className="text-gray-800">Uleash Your</span>{" "}
                    <span className="text-gray-800" style={{fontFamily: "Architects Daughter" , fontWeight: "lighter"}}>Fashion</span> <br />
                    <span className="text-black">Potential</span>
                </h1>
                <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-full mt-5">
                    Shop Now
                </button>
            </div>
          <div className="flex items-center gap-3 h-full">
            <img
              src={hero1}
              alt="hero product"
              className="w-30 h-46 object-cover rounded-lg absolute left-[150px] bottom-30 z-10"
            />
            <img
              src={hero2}
              alt="hero product"
              className="w-60 h-60 object-cover rounded-lg absolute left-64 bottom-40"
            />
            <img
              src={hero3}
              alt="hero model"
              className="w-40 h-60 object-cover rounded-lg absolute left-[450px] bottom-10"
            />
          </div>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="overflow-hidden">
            <div className="relative">
            <img
              src={hero4}
              alt="featured"
              className="w-full object-cover rounded-2xl"
            />
            <button className="absolute left-4 bottom-4 text-white border border-white rounded-full p-2 px-4 cursor-pointer">Best Seller</button>
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
