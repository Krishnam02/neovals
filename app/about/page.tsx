"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black font-['Inter'] pt-20">
      {/* Breadcrumbs */}
      <div className="px-6 md:px-16 lg:px-24 pt-6 max-w-[1400px] mx-auto">
        <div className="text-xs uppercase tracking-wider mb-6 text-gray-600">
          <a href="/" className="hover:text-black">HOME</a>
          <span className="mx-2">/</span>
          <span className="text-black">ABOUT US</span>
        </div>
      </div>

      {/* ✅ About Section */}
      <section className="flex flex-col md:flex-row items-start justify-between gap-12 px-6 md:px-16 lg:px-24 pb-6 max-w-[1400px] mx-auto">
        {/* Left Image */}
        <motion.div
          className="md:w-[65%] w-full overflow-hidden rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/ABOUT.jpg"
            alt="Slavoane streetwear vibe"
            width={1400}
            height={900}
            className="w-full h-[650px] md:h-[700px] object-cover rounded-3xl"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-[35%] w-full flex flex-col justify-center text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-['Playfair_Display'] mb-8">
          NEOVAL<span className="inline-block" style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>S</span> is where bold design meets urban authenticity.
          </h1>

          <h3 className="text-base font-semibold mb-4 uppercase tracking-wider text-gray-800">
            Our Story
          </h3>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
            Born from the rhythm of the streets and the pulse of modern culture,{" "}
            <strong>NEOVAL<span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>S</span></strong> is more than a streetwear brand — it's a
            statement. We blend bold design with authentic attitude, creating
            pieces that redefine individuality and confidence.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
            Inspired by urban energy, art, and self-expression, every NEOVAL<span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>S</span>
            drop captures the raw essence of city life. Our mission is simple:
            empower the next generation to stand out, speak up, and wear their
            values with pride. {" "}
            <strong>NEOVAL<span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>S</span> isn't just clothing — it's a movement</strong> built
            by rebels, dreamers, and creators who dare to redefine what style
            means today.
          </p>

          <h3 className="text-base font-semibold mb-4 uppercase tracking-wider text-gray-800 mt-8">
            What We Stand For
          </h3>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-xl">🎨</span>
              <div>
                <p className="font-semibold text-sm">Premium Quality</p>
                <p className="text-sm text-gray-600">200-350 GSM fabric, built to last</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">♻️</span>
              <div>
                <p className="font-semibold text-sm">Conscious Fashion</p>
                <p className="text-sm text-gray-600">Sustainable materials, ethical production</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🇮🇳</span>
              <div>
                <p className="font-semibold text-sm">Made in India</p>
                <p className="text-sm text-gray-600">Supporting local artisans and craftsmen</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-gray-300 pt-6">
            <h4 className="text-base font-semibold mb-3">Contact</h4>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">Email:</span>{" "}
              <span className="text-gray-500">hello@neovals.com</span>
            </p>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">Follow:</span>{" "}
              <span className="text-gray-500">@neovals</span>
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              Call someone who cares 😎
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
