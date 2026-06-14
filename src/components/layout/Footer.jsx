import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-green-500/30 bg-gray-950 px-4 py-10 text-white md:px-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3
            className="text-3xl font-bold text-green-400"
            style={{ fontFamily: "'Italiana', sans-serif" }}
          >
            Manthetic
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Fashion made for men who lead with ease. Discover everyday pieces built around comfort, confidence, and clean style.
          </p>
          <a
            href="https://manthetic-admin.vercel.app/login"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
          >
            Recruiter admin preview
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-green-400">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
            <li><Link to="/wishlist" className="hover:text-green-400">Wishlist</Link></li>
            <li><Link to="/settings" className="hover:text-green-400">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-green-400">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><a href="mailto:support@manthetic.com" className="hover:text-green-400">Contact Us</a></li>
            <li><Link to="/returns" className="hover:text-green-400">Returns</Link></li>
            <li><Link to="/terms" className="hover:text-green-400">Terms of Use</Link></li>
            <li><Link to="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-green-500/20 pt-5 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Manthetic. All rights reserved.</p>
        <p>support@manthetic.com</p>
      </div>
    </footer>
  );
};

export default Footer;
