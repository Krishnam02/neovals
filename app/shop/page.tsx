"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function ShopPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const allProducts = [
    { id: 1, title: "Oversized Black T-Shirt", price: "₹1,499", priceNum: 1499, image: "/product1.jpg", category: "tshirt", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: 2, title: "Oversized White Hoodie", price: "₹2,499", priceNum: 2499, image: "/product2.jpg", category: "hoodie", sizes: ["M", "L", "XL", "XXL"] },
    { id: 3, title: "Oversized Grey T-Shirt", price: "₹1,499", priceNum: 1499, image: "/product3.jpg", category: "tshirt", sizes: ["S", "M", "L", "XL"] },
    { id: 4, title: "Oversized Black Hoodie", price: "₹2,699", priceNum: 2699, image: "/product1.jpg", category: "hoodie", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: 5, title: "Oversized Graphic T-Shirt", price: "₹1,699", priceNum: 1699, image: "/product2.jpg", category: "tshirt", sizes: ["M", "L", "XL", "XXL"] },
    { id: 6, title: "Oversized Beige Hoodie", price: "₹2,599", priceNum: 2599, image: "/product3.jpg", category: "hoodie", sizes: ["S", "M", "L", "XL"] },
    { id: 7, title: "Oversized Navy T-Shirt", price: "₹1,599", priceNum: 1599, image: "/product1.jpg", category: "tshirt", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: 8, title: "Oversized Olive Hoodie", price: "₹2,799", priceNum: 2799, image: "/product2.jpg", category: "hoodie", sizes: ["M", "L", "XL", "XXL"] },
  ];

  // Filter products based on selected filters
  const products = allProducts.filter((product) => {
    // Category filter
    if (categoryFilter !== "All") {
      const filterCategory = categoryFilter === "T-Shirts" ? "tshirt" : "hoodie";
      if (product.category !== filterCategory) return false;
    }

    // Size filter
    if (sizeFilter !== "All") {
      if (!product.sizes.includes(sizeFilter)) return false;
    }

    // Price filter
    if (priceFilter !== "All") {
      if (priceFilter === "Under ₹1.5K" && product.priceNum >= 1500) return false;
      if (priceFilter === "₹1.5K-₹2.5K" && (product.priceNum < 1500 || product.priceNum > 2500)) return false;
      if (priceFilter === "Above ₹2.5K" && product.priceNum <= 2500) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.priceNum - b.priceNum;
      case "price-high":
        return b.priceNum - a.priceNum;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Video Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mt-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/shop-hero.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <Image src="/shop-banner.jpg" alt="Shop" fill className="object-cover" />
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-semibold mb-4">
              Oversized Comfort
            </h1>
            <p className="text-lg md:text-xl font-['Inter'] opacity-90">
              Premium oversized tees & hoodies for the bold
            </p>
          </div>
        </div>
      </section>

      {/* Products Section with Filters */}
      <section className="px-6 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs uppercase tracking-wider mb-6 text-gray-600">
          <a href="/" className="hover:text-black">HOME</a>
          <span className="mx-2">/</span>
          <span className="text-black">SHOP</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold">All Products</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Showing {sortedProducts.length} of {allProducts.length} items
              {(categoryFilter !== "All" || sizeFilter !== "All" || priceFilter !== "All") && (
                <button
                  onClick={() => {
                    setCategoryFilter("All");
                    setSizeFilter("All");
                    setPriceFilter("All");
                  }}
                  className="ml-3 text-xs text-red-600 hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <div className="flex gap-2">
                {["All", "T-Shirts", "Hoodies"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition ${
                      categoryFilter === cat
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Size:</span>
              <div className="flex gap-2">
                {["All", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSizeFilter(size)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition ${
                      sizeFilter === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <div className="flex gap-2">
                {["All", "Under ₹1.5K", "₹1.5K-₹2.5K", "Above ₹2.5K"].map((price) => (
                  <button
                    key={price}
                    onClick={() => setPriceFilter(price)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition whitespace-nowrap ${
                      priceFilter === price
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">No products found matching your filters</p>
            <button
              onClick={() => {
                setCategoryFilter("All");
                setSizeFilter("All");
                setPriceFilter("All");
              }}
              className="text-sm text-black underline hover:opacity-70"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((p) => (
            <div key={p.id} className="group">
              <Link href={`/shop/${p.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isInWishlist(p.id)) {
                        removeFromWishlist(p.id);
                      } else {
                        addToWishlist({
                          id: p.id,
                          title: p.title,
                          price: p.price,
                          image: p.image,
                          category: p.category === "tshirt" ? "T-Shirt" : "Hoodie",
                        });
                      }
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(p.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>
                </div>
              </Link>
              <Link href={`/shop/${p.id}`}>
                <div className="flex items-center justify-between mt-3 cursor-pointer">
                  <div>
                    <h3 className="text-sm md:text-base font-medium hover:underline">{p.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">Unisex • Oversized Fit</p>
                  </div>
                  <span className="text-sm md:text-base font-semibold">{p.price}</span>
                </div>
              </Link>
              <Link href={`/shop/${p.id}`}>
                <button className="mt-3 w-full border border-black rounded-full py-2 text-sm hover:bg-black hover:text-white transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
