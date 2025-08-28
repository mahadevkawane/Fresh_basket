import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fresh-basket-backend.onrender.com/api/orders",
        formData
      );
      setMessage("✅ Order placed successfully!");
      setFormData({ name: "", address: "", phone: "" });
      console.log(res.data);
    } catch (err) {
      console.error("Error placing order:", err);
      setMessage("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

        {message && <p className="text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
