"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ChevronLeft, CreditCard, Truck, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black pt-24">
        <section className="px-6 md:px-12 lg:px-20 py-10 max-w-[1200px] mx-auto">
          {/* Breadcrumbs */}
          <div className="text-xs uppercase tracking-wider mb-6 text-gray-600">
            <a href="/" className="hover:text-black">HOME</a>
            <span className="mx-2">/</span>
            <a href="/cart" className="hover:text-black">CART</a>
            <span className="mx-2">/</span>
            <span className="text-black">CHECKOUT</span>
          </div>

          <h1 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">No Items to Checkout</h1>
          <p className="text-gray-600 mb-8">Add items to your cart first!</p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Go to Shop
          </button>
        </section>
        <Footer />
      </main>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    // In real app, process payment here
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === 3) {
    return (
      <main className="min-h-screen bg-white text-black pt-24">
        <section className="px-6 md:px-12 lg:px-20 py-20 max-w-[600px] mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order, {shippingInfo.fullName}!</p>
          <p className="text-gray-600 mb-8">We'll send a confirmation email to {shippingInfo.email}</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-3xl font-bold">₹{total.toLocaleString()}</p>
          </div>
          <button
            onClick={() => router.push("/shop")}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <section className="px-6 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto">
        <button
          onClick={() => step === 1 ? router.push("/cart") : setStep(1)}
          className="flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-black" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-black text-white" : "bg-gray-200"}`}>
                1
              </div>
              <span className="text-sm font-medium hidden md:inline">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-black" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-black text-white" : "bg-gray-200"}`}>
                2
              </div>
              <span className="text-sm font-medium hidden md:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="border rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <textarea
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        rows={3}
                        placeholder="Street address, apartment, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="border rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-gray-600">Pay via Google Pay, PhonePe, Paytm</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border rounded-xl p-6 bg-gray-50">
                  <h3 className="font-semibold mb-4">Shipping Address</h3>
                  <p className="text-sm text-gray-700">
                    {shippingInfo.fullName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}<br />
                    {shippingInfo.phone}<br />
                    {shippingInfo.email}
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Place Order
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="border rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="font-semibold mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
