import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fresh-basket-backend.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center">Loading product details...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://fresh-basket-backend.onrender.com/Images/${product.image}`}
            alt={product.name}
            className="w-80 h-80 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Info */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-6">₹{product.price}</p>

        {/* Button */}
        <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
