import { useDispatch, useSelector } from "react-redux";
import { Search, User, ShoppingBag, Heart } from "lucide-react"; // ⬅ Added Heart
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.count);

  // Load cart data
  const token = localStorage.getItem("manthetic_token");
  useCart(token);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();
      if (query) {
        navigate(`/products?search=${encodeURIComponent(query)}`);
        setSearchTerm("");
      }
    }
  };

  const handleUserClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowMenu((prev) => !prev);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full px-6 md:px-32 py-4 flex items-center justify-between border-b border-gray-200 bg-white relative">
      {/* Left */}
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>Manthetic</Link>
        </h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to={"/products"} className="hover:text-black">
            Shop
          </Link>
          <a href="#" className="hover:text-black">
            About
          </a>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-200 px-4 py-2 rounded-full w-64">
          <Search className="w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Wishlist */}
        <Link to="/wishlist" className="relative">
          <Heart className="w-5 h-5 text-black cursor-pointer" />
        </Link>

        {/* User Icon */}
        <div className="relative">
          <User
            className="w-5 h-5 text-black cursor-pointer"
            onClick={handleUserClick}
          />
          {showMenu && user && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
              <Link
                to={"/setting"}
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Settings
              </Link>
              <button
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingBag className="w-5 h-5 text-black cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
