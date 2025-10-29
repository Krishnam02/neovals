"use client";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 400], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden font-[Poppins] text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full">
        <motion.img
          src="/hero.jpg"
          alt="Hero background"
          style={{ y, opacity }}
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 -z-10"></div>

        {/* HERO TEXT */}
        <div className="absolute bottom-24 right-20 text-right max-w-xl">
          <motion.h1
            className="text-white text-5xl md:text-7xl font-semibold leading-tight font-['Playfair_Display']"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Confidence is the best outfit.
            <br />
            Wear it daily.
          </motion.h1>

          <motion.p
            className="text-white mt-5 text-lg md:text-xl font-light font-['Inter']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            When you look good, you feel good.
          </motion.p>

          <motion.a
            href="/shop"
            className="mt-10 inline-block px-6 py-3 border border-white text-white rounded-full text-base font-['Inter'] hover:bg-white hover:text-black transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Shop this look →
          </motion.a>
        </div>

        {/* Bottom Scrolling Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white text-black overflow-hidden py-2">
          <div className="marquee whitespace-nowrap text-sm font-medium tracking-wide flex animate-marquee">
            <span className="mx-8">Free shipping on orders over ₹3000</span>
            <span className="mx-8">Free shipping on orders over ₹3000</span>
            <span className="mx-8">Free shipping on orders over ₹3000</span>
            <span className="mx-8">Free shipping on orders over ₹3000</span>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="bg-[#f5f7f6] text-black py-20 px-10">
        <div className="flex items-center justify-between mb-16 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold">
            Best Sellers
          </h2>
          <a
            href="/shop"
            className="text-gray-700 text-sm md:text-base hover:underline flex items-center gap-1"
          >
            Explore the shop →
          </a>
        </div>

        <div className="flex flex-col gap-24 max-w-6xl mx-auto">
          {[
            { img: "/product1.jpg", title: "Corduroy Overshirt", tag: "BEST SELLER" },
            { img: "/product2.jpg", title: "Brown Shirt Jacket", tag: "BEST SELLER" },
            { img: "/product3.jpg", title: "Black Denim Jacket", tag: "BEST SELLER" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-12`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-1 space-y-5 text-left">
                <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded-sm">
                  {item.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-['Playfair_Display']">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-md">
                  Discover timeless classics made from premium fabric and designed to
                  complement your style.
                </p>
                <button className="border border-black px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all">
                  Shop Now →
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SHOP LINK FULL WIDTH IMAGE */}
      <section className="relative w-full h-[500px] my-20">
        <a href="/shop">
          <motion.img
            src="/shop-banner.jpg"
            alt="Shop Banner"
            className="absolute inset-0 w-full h-full object-cover rounded-none"
            whileHover={{ scale: 1.02 }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-4xl md:text-6xl font-['Playfair_Display'] font-semibold tracking-wide">
              Explore the Collection →
            </h2>
          </div>
        </a>
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="bg-[#f5f7f6] text-black py-20 px-10">
        <div className="flex items-center justify-between mb-16 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold">
            NEW ARRIVALS
          </h2>
          <a
            href="/shop"
            className="text-gray-700 text-sm md:text-base hover:underline flex items-center gap-1"
          >
            Explore the shop →
          </a>
        </div>

        <div className="flex flex-col gap-24 max-w-6xl mx-auto">
          {[
            { img: "/product1.jpg", title: "Corduroy Overshirt", tag: "NEW" },
            { img: "/product2.jpg", title: "Brown Shirt Jacket", tag: "NEW" },
            { img: "/product3.jpg", title: "Black Denim Jacket", tag: "NEW" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-12`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-1 space-y-5 text-left">
                <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded-sm">
                  {item.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-['Playfair_Display']">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-md">
                  Crafted with care and designed for the modern lifestyle — 
                  explore our latest additions now.
                </p>
                <button className="border border-black px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all">
                  Shop Now →
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER + CART DRAWER */}
      <Footer />
      <CartDrawer />


      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
