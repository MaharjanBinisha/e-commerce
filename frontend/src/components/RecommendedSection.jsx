// src/components/RecommendedSection.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const RecommendedSection = () => {
  const { backendUrl, currency, storeUserInteraction } = useContext(ShopContext);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const recommendationUrl = import.meta.env.VITE_RECOMMENDATION_URL || "http://127.0.0.1:5001/recommend";

      const response = await axios.post(
        recommendationUrl,
        { user_id: userId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.recommended_products) {
        setRecommendedProducts(response.data.recommended_products);
      }
    } catch (error) {
      console.error("🔥 Error fetching homepage recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="mt-20 px-4">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="border p-4 shadow-sm block hover:shadow-md transition duration-300"
              onClick={async (e) => {
                e.preventDefault();
                const productData = {
                  _id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  description: product.description,
                  category: product.category,
                  subCategory: product.subCategory,
                  bestseller: product.bestseller,
                };

                await storeUserInteraction("view", productData);
                setTimeout(() => {
                  window.location.href = `/product/${product.id}`;
                }, 500);
              }}
            >
              <img
                src={product.image?.[0] || "placeholder.jpg"}
                alt={product.name}
                className="w-full h-60 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{currency}{product.price}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedSection;
