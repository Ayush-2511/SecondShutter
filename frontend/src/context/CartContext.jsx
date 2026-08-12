import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { getCart, addToCart, removeFromCart } from '../api/cartApi';
import { useAuth } from './AuthContext';

const TAX_RATE = 0.07;
const shipping_rates = [
  { id: "ship_standard", label: "Standard Shipping", eta: "3–5 Business Days", price: 0 },
  { id: "ship_express",  label: "Express Shipping",  eta: "1–2 Business Days", price: 999 },
];
const CURRENCY_SYMBOL = "₹";

const CartContext = createContext();

// Local helper: recompute summary without an API round-trip
function computeSummaryLocally(items, shippingRateId) {
  const subtotal = items.reduce((acc, item) => acc + item.current_price, 0);
  const selectedRate = shipping_rates.find((r) => r.id === shippingRateId) || shipping_rates[0];
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + selectedRate.price + tax;
  return {
    items,
    item_count: items.length,
    subtotal,
    shipping: selectedRate,
    shipping_rates,
    tax,
    total,
    currency: 'INR',
    currency_symbol: CURRENCY_SYMBOL,
  };
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState('ship_standard');
  const [initialLoading, setInitialLoading] = useState(true);
  
  const selectedShippingRef = useRef(selectedShipping);
  selectedShippingRef.current = selectedShipping;

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setCartSummary(null);
      setInitialLoading(false);
      return;
    }
    try {
      const items = await getCart();
      const safeItems = Array.isArray(items) ? items : [];
      setCartItems(safeItems);
      setCartSummary(computeSummaryLocally(safeItems, selectedShippingRef.current));
    } catch (err) {
      console.error('Failed to load cart:', err);
      setCartItems([]);
      setCartSummary(null);
    } finally {
      setInitialLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  // Recompute locally when shipping changes
  useEffect(() => {
    if (cartSummary) {
      setCartSummary(computeSummaryLocally(cartItems, selectedShipping));
    }
  }, [selectedShipping]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) return;
    await addToCart(productId);
    await refreshCart();
  };

  // Optimistic remove
  const handleRemoveFromCart = (cartItemProductId) => {
    const updatedItems = cartItems.filter((i) => i.product_id !== cartItemProductId);
    setCartItems(updatedItems);
    setCartSummary(computeSummaryLocally(updatedItems, selectedShippingRef.current));
    removeFromCart(cartItemProductId).catch(console.error);
  };

  const handleShippingChange = (rateId) => setSelectedShipping(rateId);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
        cartItems,
        cartSummary,
        loading: initialLoading,
        selectedShipping,
        handleAddToCart,
        handleRemoveFromCart,
        handleShippingChange,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
