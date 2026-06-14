import deal1 from "@/assets/images/deal1.jpg";
import deal2 from "@/assets/images/deal2.jpg";
import deal3 from "@/assets/images/deal3.jpg";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DealBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 md:px-32 py-12">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="flex flex-col justify-center text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Limited Picks
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              Fresh Deals For Everyday Fits
            </h2>
            <p className="mt-4 max-w-md text-sm md:text-base text-white/70">
              Explore sharp essentials, relaxed layers, and easy weekend staples before they move out.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 inline-flex w-fit items-center gap-2 self-center rounded-full bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 md:self-start"
            >
              Explore Deals
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            {[deal1, deal2, deal3].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`deal-${idx + 1}`}
                className={`h-44 w-28 rounded-xl object-cover shadow-lg ring-1 ring-white/10 md:h-64 md:w-40 ${
                  idx === 1 ? "translate-y-5" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealBanner;
