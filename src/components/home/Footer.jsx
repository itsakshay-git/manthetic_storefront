const Footer = () => {
  return (
    <footer className="bg-green-600 text-white px-4 md:px-16 py-10 mt-10 rounded-tl-3xl rounded-tr-3xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Manthetic</h3>
          <p className="text-sm text-white/90">
            Fashion made for men who lead. Discover effortless style and comfort.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-white/90">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
            <li><a href="#" className="hover:underline">Profile</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-white/90">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm text-white/90">Email: support@manthetic.com</p>
          <p className="text-sm text-white/90">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-white/70 border-t border-white/20 pt-4">
        &copy; {new Date().getFullYear()} Manthetic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
