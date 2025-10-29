"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // disable scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-black shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold tracking-wide">Your Cart ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-600 hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                    <div className="relative w-20 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">Size: {item.size}</p>
                      <p className="text-sm font-semibold mt-1">{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 border rounded hover:bg-gray-100 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 border rounded hover:bg-gray-100 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-sm underline hover:opacity-70"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition mb-2">
                    Checkout →
                  </button>
                </Link>
                <Link href="/cart" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full border border-black py-3 rounded-full hover:bg-gray-50 transition text-sm">
                    View Full Cart
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
