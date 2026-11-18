import { ShopContext } from "./ShopContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  console.log('backendUrl:', backendUrl, 'products:', products)

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Please select product size.');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }
      else{
        cartData[itemId][size] = 1;
      }
    }
    else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for(const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items);
      for(const item in cartItems[items]){
        try{  
          if (cartItems[items][item] > 0){
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error){
          console.error(error);
        }
      }
    }
    return totalAmount;
  }

  const placeOrder = (paymentMethod) => {
    const items = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (!product) continue;
          items.push({
            _id: itemId,
            name: product.name,
            image: product.image[0],
            price: product.price, // snapshot, so later price changes don't alter past orders
            size,
            quantity,
          });
        }
      }
    }

    if (items.length === 0) return false;

    setOrders((prev) => [
      {
        id: Date.now(),
        items,
        date: new Date().toDateString(),
        paymentMethod,
        status: 'Order Placed',
      },
      ...prev,
    ]);
    setCartItems({});
    return true;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0){
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  useEffect(() => {
  let ignore = false;

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (ignore) return;

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (ignore) return;
      console.error(error);
      toast.error(error.message);
    }
  };

  getProductsData();

  return () => {
      ignore = true;
  };

  }, [backendUrl]);

 
  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate,
    orders, placeOrder, backendUrl,
    setToken, token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );

  
};

export default ShopContextProvider;