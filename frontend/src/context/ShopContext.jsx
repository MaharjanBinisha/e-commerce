import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = 'Rs';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const recommendationUrl = import.meta.env.VITE_RECOMMENDATION_URL || "http://localhost:5001";

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get logged-in user ID
      if (!userId) return;
  
      const response = await axios.post(`${recommendationUrl}/recommend`, { user_id: userId });
  
      if (response.data.recommended_products) {
        setRecommendedProducts(response.data.recommended_products);
      } else {
        console.warn("No recommendations found.");
      }
    } catch (error) {
      console.error("🔥 Error fetching recommendations:", error);
    }
  };


  // const addToCart = async (itemId, size) => {
  //   if (!size) {
  //     toast.error('Please select size for the product');
  //     return;

  //   }
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select size for the product');
      return;
    }
  
    const product = products.find(p => p._id === itemId);
    if (!product || product.quantity <= 0) {
      toast.error('This product is sold out');
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);


    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)

      }

    }
  }

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData)

    if (token) {

      try {

        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)

      }

    }

  }


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }

        } catch (error) {

        }
      }
    }
    return totalAmount;
  }

  const getProductsData = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  

//working
  // const storeUserInteraction = async (interactionType, productId = null, searchQuery = null) => {
  //   try {
  //     console.log("📩 Storing interaction:", { interactionType, productId, searchQuery });
  
  //     if (!productId) {
  //       console.warn("⚠️ No productId received! Interaction not stored.");
  //       return;
  //     }
  
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.warn("⚠️ No token found. Interaction not stored.");
  //       return;
  //     }
  
  //     const requestData = { interactionType, productId };
  //     console.log("📤 Sending request data:", requestData);
  
  //     const response = await axios.post(`${backendUrl}/api/interaction/store`, requestData, {
  //       headers: { token },
  //     });
  
  //     console.log("✅ Interaction stored successfully:", response.data);
  //   } catch (error) {
  //     console.error("🔥 Error storing interaction:", error);
  //   }
  // };
  
  const storeUserInteraction = async (interactionType, product = {}, searchQuery = null) => {
    console.log("✅ storeUserInteraction() function called!");  // ✅ Check if function is being executed

    const token = localStorage.getItem("token");  // Retrieve token from local storage

    if (!token) {
        console.error("⚠️ No token found. User is not authenticated.");
        return;
    }

    const interactionData = {
        interactionType,
        searchQuery,
        productId: product._id || product.id || null,
        productDetails: {
            _id: product._id || product.id,  
            name: product.name || "Unknown",
            description: product.description || "No description",
            price: product.price || 0,
            image: product.image && product.image.length > 0 ? product.image : [],
            category: product.category || "Unknown",
            subCategory: product.subCategory || "Unknown",
            bestseller: product.bestseller || false,
        }
    };

    console.log("📩 Storing interaction:", interactionData);  // ✅ Check if data is being created properly

    try {
        const response = await fetch(`${backendUrl}/api/interactions/store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token  // ✅ Send token in 'token' header
            },
            body: JSON.stringify(interactionData),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Interaction stored successfully:", result);
    } catch (error) {
        console.error("🔥 Error storing interaction:", error);
    }
};

  
  // Backend search function
const searchProducts = async (query) => {
  try {
    if (!query) {
      getProductsData(); // Reset products if search is empty
      return;
    }

    const response = await axios.get(`${backendUrl}/api/product/search?query=${query}`);
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Search function to update state and trigger API search

const handleSearch = (query) => {
  setSearch(query);
  searchProducts(query);

  console.log(`🔍 Searching for: ${query}`);  // Debug log

  if (query.trim() !== "") {
    console.log(`📤 Storing search interaction: ${query}`); // Debug log
    storeUserInteraction("search", null, query);
  }
};

const handleCloseSearch = () => {
  setShowSearch(false);
  setSearch("");  // Clear search input
  getProductsData(); // Reset to all products
};


// const getUserCart = async (token)=>{
// try {
//   const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
//   if (response.data.success) {
//     setCartItems(response.data.cartData)
//   }
// } catch (error) {
//   console.log(error);
//       toast.error(error.message)
// }
// }
const getUserCart = async (token) => {
  try {
    const userId = localStorage.getItem("userId"); // Retrieve userId if stored
    const response = await axios.post(
      backendUrl + "/api/cart/get",
      { userId },  // Send userId in body
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to fetch cart data");
  }};
  useEffect(() => {
    getProductsData()

  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }

  }, [])



  const value = {
    products, currency, delivery_fee,
    search,setSearch: handleSearch, showSearch, setShowSearch,fetchRecommendations,
    cartItems, addToCart,setCartItems,handleCloseSearch,storeUserInteraction,
    getCartCount, updateQuantity, getCartAmount, navigate, backendUrl,
    setToken, token
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;