import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 
import { FaShoppingCart } from "react-icons/fa"; 
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart items to calculate total quantity
  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      const totalItems = res.data.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <nav className="bg-black shadow-md px-4 sm:px-10 py-4">
      <div className="flex justify-between items-center">
        {/* Logo with Image + Text */}
        <div className="flex items-center space-x-2">
          <img
            src="/apple.jpeg" 
            alt="Fresh Basket Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-white font-bold text-2xl">Fresh_Basket</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium items-center">
          <li className="hover:text-red-400 transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-red-400 transition duration-300">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-red-400 transition duration-300">
            <Link to="/products">Products</Link>
          </li>
          <li className="hover:text-red-400 transition duration-300">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-red-400 transition duration-300">
            <Link to="/checkout">Checkout</Link>
          </li>

          {/* 🛒 Cart Icon with Counter */}
          <li className="relative">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col mt-4 space-y-4 text-white font-medium md:hidden">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link></li>
          
          {/* Cart in mobile menu */}
          <li className="relative">
            <Link to="/cart" className="flex items-center" onClick={() => setIsOpen(false)}>
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
