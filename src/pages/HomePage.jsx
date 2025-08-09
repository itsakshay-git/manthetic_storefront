import HeroSection from "@/components/home/HeroSection";
import CategoryList from "@/components/home/CategoryList";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import DealBanner from "@/components/home/DealBanner";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const HomePage = () => {
  return (
    <main className="font-sans">
      {/* <Navbar /> */}
      <HeroSection />
      <CategoryList />
      <TopSellingProducts />
      <DealBanner />
      <Testimonials />
      {/* <Footer /> */}
    </main>
  );
};

export default HomePage;
