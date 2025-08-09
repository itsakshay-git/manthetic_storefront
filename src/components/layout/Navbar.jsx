import { useDispatch, useSelector } from "react-redux";
import { Search, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMjA1Nzc0LCJleHAiOjE3NTU3OTc3NzR9.1bOh8Dnuf334mRbxmwVGkpI2BQC5YO1BTFxkFdLwqX0"
  useCart(token);
  const cartCount = useSelector((state) => state.cart.count);
    
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();
      if (query) {
        navigate(`/products?search=${encodeURIComponent(query)}`);
        setSearchTerm("");
      }
    }
  };

  return (
    <header className="w-full px-6 md:px-32 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>Manthetic</Link>
        </h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to={"/products"} className="hover:text-black">Shop</Link>
          <a href="#" className="hover:text-black">Best Seller</a>
          <a href="#" className="hover:text-black">About</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
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
        <User className="w-5 h-5 text-black cursor-pointer" />
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
