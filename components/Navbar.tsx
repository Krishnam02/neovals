"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount, wishlist, setIsCartOpen } = useCart();

  // Mock product data for search
  const allProducts = [
    { id: 1, title: "Oversized Black T-Shirt", price: "₹1,499", image: "/product1.jpg", category: "T-Shirt" },
    { id: 2, title: "Oversized White Hoodie", price: "₹2,499", image: "/product2.jpg", category: "Hoodie" },
    { id: 3, title: "Oversized Grey T-Shirt", price: "₹1,499", image: "/product3.jpg", category: "T-Shirt" },
    { id: 4, title: "Oversized Black Hoodie", price: "₹2,699", image: "/product1.jpg", category: "Hoodie" },
    { id: 5, title: "Oversized Graphic T-Shirt", price: "₹1,699", image: "/product2.jpg", category: "T-Shirt" },
    { id: 6, title: "Oversized Beige Hoodie", price: "₹2,599", image: "/product3.jpg", category: "Hoodie" },
    { id: 7, title: "Oversized Navy T-Shirt", price: "₹1,599", image: "/product1.jpg", category: "T-Shirt" },
    { id: 8, title: "Oversized Olive Hoodie", price: "₹2,799", image: "/product2.jpg", category: "Hoodie" },
  ];

  // Filter products based on search query
  const searchResults = searchQuery.trim()
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleProductClick = (id: number) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop/${id}`);
  };

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-14 py-5 text-[14px] font-medium tracking-wide z-50 transition-all duration-500 ${
          isHome && !scrolled ? "bg-transparent text-white" : "bg-black text-white shadow-lg"
        }`}
      >
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/shop" 
            className={`hover:opacity-70 transition ${pathname === "/shop" ? "underline underline-offset-4" : ""}`}
          >
            SHOP
          </Link>
          <Link 
            href="/about" 
            className={`hover:opacity-70 transition ${pathname === "/about" ? "underline underline-offset-4" : ""}`}
          >
            ABOUT US
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden hover:opacity-70 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-wider">
          NEOVAL<span className="inline-block" style={{ transform: 'scaleX(-1)' }}>S</span>
        </Link>

        {/* Icons */}
        <div className="flex gap-4 md:gap-6 items-center text-xl">
          <button onClick={() => setSearchOpen(true)}>
            <Search className="w-5 h-5 cursor-pointer hover:opacity-70" />
          </button>
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5 cursor-pointer hover:opacity-70" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:opacity-70" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-64 h-full bg-black text-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-semibold tracking-wider">
                NEOVAL<span className="inline-block" style={{ transform: 'scaleX(-1)' }}>S</span>
              </span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg hover:opacity-70 transition ${pathname === "/" ? "underline underline-offset-4" : ""}`}
              >
                HOME
              </Link>
              <Link 
                href="/shop" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg hover:opacity-70 transition ${pathname === "/shop" ? "underline underline-offset-4" : ""}`}
              >
                SHOP
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg hover:opacity-70 transition ${pathname === "/about" ? "underline underline-offset-4" : ""}`}
              >
                ABOUT US
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
          <div className="bg-white w-full max-w-2xl mx-auto mt-20 rounded-lg max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Search Input */}
            <div className="flex items-center gap-3 p-6 border-b">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 text-lg outline-none"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {searchQuery.trim() === "" ? (
                <div className="text-sm text-gray-600">
                  <p className="mb-2 font-medium">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {["t-shirt", "hoodie", "black", "graphic"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</p>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                    >
                      <div className="relative w-16 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{product.category}</p>
                        <p className="text-sm font-semibold mt-1">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-2">No products found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500">Try searching for "t-shirt", "hoodie", or "black"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
