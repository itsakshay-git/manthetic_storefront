import { Search, User, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full px-6 md:px-32 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold">Manthetic</h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-black">Shop</a>
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
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>
        <User className="w-5 h-5 text-black" />
        <ShoppingBag className="w-5 h-5 text-black" />
      </div>
    </header>
  );
};

export default Navbar;
