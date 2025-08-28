import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fresh-basket-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-lg h-60 flex items-center justify-center bg-gray-50">
              <img
                src={`https://fresh-basket-backend.onrender.com/Images/${product.image}`}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

                {/* Short Description */}
                {product.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <p className="text-gray-700 font-bold text-xl">₹{product.price}</p>
              </div>

              {/* Button */}
              <Link
                to={`/product/${product._id}`}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded text-center font-medium 
                           hover:bg-blue-600 hover:scale-105 transform transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
