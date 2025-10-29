"use client";
import { useCart } from "@/lib/cartContext";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black pt-24">
        <section className="px-6 md:px-12 lg:px-20 py-20 max-w-[600px] mx-auto text-center">
          <div className="mb-8">
            <Heart className="w-24 h-24 mx-auto mb-6 text-gray-200 stroke-1" />
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Start adding items you love!
            </p>
            <p className="text-gray-500 text-sm">
              Click the heart icon on any product to save it here for later.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/shop">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-semibold">
                Explore Shop
              </button>
            </Link>
            <Link href="/">
              <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition font-semibold">
                Go Home
              </button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left bg-gray-50 rounded-2xl p-6">
            <div>
              <p className="font-semibold text-sm mb-1">💝 Save Favorites</p>
              <p className="text-xs text-gray-600">Keep track of items you love</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">🔔 Get Notified</p>
              <p className="text-xs text-gray-600">Updates on price drops (coming soon)</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">🎁 Easy Access</p>
              <p className="text-xs text-gray-600">Quick checkout when ready</p>
            </div>
          </div>
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
          <span className="text-black">WISHLIST</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/shop/${item.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition z-10"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>

              <div className="space-y-1">
                <Link href={`/shop/${item.id}`}>
                  <h3 className="text-sm md:text-base font-medium hover:underline">{item.title}</h3>
                </Link>
                <p className="text-xs text-gray-600">{item.category}</p>
                <p className="text-sm md:text-base font-semibold">{item.price}</p>
              </div>

              <Link href={`/shop/${item.id}`}>
                <button className="mt-3 w-full border border-black rounded-full py-2 text-sm hover:bg-black hover:text-white transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
