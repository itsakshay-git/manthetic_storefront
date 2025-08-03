import deal1 from "@/assets/images/deal1.jpg";
import deal2 from "@/assets/images/deal2.jpg";
import deal3 from "@/assets/images/deal3.jpg";

const DealBanner = () => {
  return (
    <section className="w-full px-4 md:px-32 py-10">
      <div className="bg-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 space-y-3 my-20 px-5">
          <h2 className="text-xl md:text-5xl font-bold text-gray-800">
            Grab Deals, <br />
            <span className="text-green-600">Don't Missout !</span>
          </h2>
          <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-full">
            Explore Deals
          </button>
        </div>
        
        <div className="flex-1 flex justify-center items-center gap-4">
          {[deal1, deal2, deal3].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`deal-${idx + 1}`}
              className={`w-36 h-50 object-cover rounded-md shadow-md ${idx === 1 ? "mt-10" : "mt-0"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealBanner;
