"use client";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black pt-24">
        <section className="px-6 md:px-12 lg:px-20 py-20 max-w-[1400px] mx-auto text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some oversized tees and hoodies to get started!</p>
          <Link href="/shop">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
              Continue Shopping
            </button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <section className="px-6 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs uppercase tracking-wider mb-6 text-gray-600">
          <a href="/" className="hover:text-black">HOME</a>
          <span className="mx-2">/</span>
          <span className="text-black">CART</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border rounded-xl">
                <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.category} • Size: {item.size}</p>
                    <p className="text-lg font-semibold mt-2">{item.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Free Shipping Progress */}
              {getCartTotal() < 3000 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">
                      Add ₹{(3000 - getCartTotal()).toLocaleString()} more for FREE shipping!
                    </span>
                    <span className="text-xs text-blue-700">🚚</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((getCartTotal() / 3000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {getCartTotal() >= 3000 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-sm font-medium text-green-900">
                      You've unlocked FREE shipping!
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${getCartTotal() >= 3000 ? 'text-green-600' : 'text-gray-900'}`}>
                    {getCartTotal() >= 3000 ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-xl">
                    ₹{(getCartTotal() + (getCartTotal() >= 3000 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition mb-3">
                  Proceed to Checkout
                </button>
              </Link>
              
              <Link href="/shop">
                <button className="w-full border border-black py-4 rounded-full font-medium hover:bg-gray-50 transition">
                  Continue Shopping
                </button>
              </Link>

              <div className="mt-6 pt-6 border-t space-y-2 text-xs text-gray-600">
                <p>✓ Secure checkout</p>
                <p>✓ 7-day easy returns</p>
                <p>✓ Free shipping on orders above ₹3000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
