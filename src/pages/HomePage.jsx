import HeroSection from "@/components/home/HeroSection";
import CategoryList from "@/components/home/CategoryList";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import DealBanner from "@/components/home/DealBanner";
import Testimonials from "@/components/home/Testimonials";

const HomePage = () => {
  return (
    <main className="font-sans">
      {/* <Navbar /> */}
      <HeroSection />
      <CategoryList />
      <TopSellingProducts />
      <DealBanner />
      <Testimonials />
    </main>
  );
};

export default HomePage;
