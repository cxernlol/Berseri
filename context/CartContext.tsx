"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Product, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  voucherCode: string | null;
  discountPercentage: number;
}

type CartAction =
  | { type: "INIT_CART"; payload: CartState }
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number; catatanKhusus?: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_VOUCHER"; payload: { code: string; discount: number } }
  | { type: "REMOVE_VOUCHER" };

const initialState: CartState = {
  items: [],
  voucherCode: null,
  discountPercentage: 0,
};

const VALID_VOUCHERS: Record<string, number> = {
  KEMBANG10: 10,
  WISUDA20: 20,
  NEWUSER: 15,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;

    case "ADD_ITEM": {
      const { product, quantity = 1, catatanKhusus } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                catatanKhusus: catatanKhusus || item.catatanKhusus,
              }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          { product, quantity, catatanKhusus: catatanKhusus || "" },
        ];
      }

      return { ...state, items: newItems };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      return { ...state, items: newItems };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        voucherCode: null,
        discountPercentage: 0,
      };

    case "APPLY_VOUCHER":
      return {
        ...state,
        voucherCode: action.payload.code,
        discountPercentage: action.payload.discount,
      };

    case "REMOVE_VOUCHER":
      return {
        ...state,
        voucherCode: null,
        discountPercentage: 0,
      };

    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  voucherCode: string | null;
  discountPercentage: number;
  totalItems: number;
  subtotal: number;
  potonganDiskon: number;
  totalHarga: number;
  isLoaded: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, catatanKhusus?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "kembang_berseri_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Restore from localStorage after mount (safe hydration)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: "INIT_CART", payload: parsed });
        }
      }
    } catch {
      // LocalStorage access fail fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write error
    }
  }, [state, isLoaded]);

  const addToCart = useCallback(
    (product: Product, quantity = 1, catatanKhusus?: string) => {
      dispatch({
        type: "ADD_ITEM",
        payload: { product, quantity, catatanKhusus },
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const applyVoucher = useCallback((codeInput: string) => {
    const code = codeInput.trim().toUpperCase();
    if (VALID_VOUCHERS[code] !== undefined) {
      const discount = VALID_VOUCHERS[code];
      dispatch({ type: "APPLY_VOUCHER", payload: { code, discount } });
      return {
        success: true,
        message: `Kupon ${code} berhasil! Diskon ${discount}% diterapkan.`,
      };
    }
    return {
      success: false,
      message: "Kode voucher tidak valid atau telah kadaluarsa.",
    };
  }, []);

  const removeVoucher = useCallback(() => {
    dispatch({ type: "REMOVE_VOUCHER" });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.harga * item.quantity,
    0
  );
  const potonganDiskon = Math.round(
    (subtotal * state.discountPercentage) / 100
  );
  const totalHarga = Math.max(0, subtotal - potonganDiskon);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        voucherCode: state.voucherCode,
        discountPercentage: state.discountPercentage,
        totalItems,
        subtotal,
        potonganDiskon,
        totalHarga,
        isLoaded,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyVoucher,
        removeVoucher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
