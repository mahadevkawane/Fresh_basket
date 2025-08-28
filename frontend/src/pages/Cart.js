import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart products
  useEffect(() => {
    axios
      .get("https://fresh-basket-backend.onrender.com/api/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // Remove product from cart
  const handleRemove = (id) => {
    axios
      .delete(`https://fresh-basket-backend.onrender.com/api/cart/${id}`)
      .then(() => {
        setCart(cart.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Error removing product:", err));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              {/* Image */}
              <div className="flex items-center space-x-4">
                <img
                  src={`https://fresh-basket-backend.onrender.com/Images/${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
