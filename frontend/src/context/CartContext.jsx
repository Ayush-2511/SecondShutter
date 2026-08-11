import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { getCartSummary, addToCart, removeFromCart } from '../api/cartApi';
import { TAX_RATE, shipping_rates, CURRENCY_SYMBOL } from '../data/mockDatabase';

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState('ship_standard');
  const [initialLoading, setInitialLoading] = useState(true);
  const selectedShippingRef = useRef(selectedShipping);
  selectedShippingRef.current = selectedShipping;

  const refreshCart = useCallback(async () => {
    try {
      const summary = await getCartSummary(selectedShippingRef.current);
      setCartItems(summary.items);
      setCartSummary(summary);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setInitialLoading(false);
    }
  }, []);

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
    await addToCart(productId);
    await refreshCart();
  };

  // Optimistic remove — update local state instantly, sync API in background
  const handleRemoveFromCart = (cartItemId) => {
    const updatedItems = cartItems.filter((i) => i.cart_item_id !== cartItemId);
    setCartItems(updatedItems);
    setCartSummary(computeSummaryLocally(updatedItems, selectedShippingRef.current));
    removeFromCart(cartItemId).catch(console.error);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
