import React from 'react';
import { atom, computed } from 'nanostores';
import { useStore } from '@nanostores/react';
import { Product } from '../data/mockData';

export interface CartItem extends Product {
  quantity: number;
}

// Create the store
export const $cart = atom<CartItem[]>([]);

// Actions
export const addToCart = (product: Product) => {
  const currentCart = $cart.get();
  const existing = currentCart.find(item => item.id === product.id);
  if (existing) {
    $cart.set(currentCart.map(item => 
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    $cart.set([...currentCart, { ...product, quantity: 1 }]);
  }
};

export const removeFromCart = (productId: string) => {
  $cart.set($cart.get().filter(item => item.id !== productId));
};

export const clearCart = () => $cart.set([]);

// Computed values
export const $totalItems = computed($cart, (cart) => 
  cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const $totalPrice = computed($cart, (cart) => 
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Hook for React components
export const useCart = () => {
  const cart = useStore($cart);
  const totalItems = useStore($totalItems);
  const totalPrice = useStore($totalPrice);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  };
};

// Keep CartProvider as a no-op to avoid breaking existing layouts
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
