import deal1 from "@/assets/images/deal1.jpg";
import deal2 from "@/assets/images/deal2.jpg";
import deal3 from "@/assets/images/deal3.jpg";

const DealBanner = () => {
  return (
    <section className="w-full px-4 md:px-32 py-10">
      <div className="bg-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Content */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800 leading-snug">
            Grab Deals, <br />
            <span className="text-green-600">Don't Missout !</span>
          </h2>
          <button className="bg-green-500 text-white text-sm md:text-base px-5 py-2 rounded-full hover:bg-green-600 transition">
            Explore Deals
          </button>
        </div>
        
        {/* Right Images */}
        <div className="flex-1 flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
          {[deal1, deal2, deal3].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`deal-${idx + 1}`}
              className={`w-28 h-36 md:w-36 md:h-52 object-cover rounded-lg shadow-md ${
                idx === 1 ? "mt-4 md:mt-10" : "mt-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealBanner;
