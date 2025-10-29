"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ChevronLeft, Heart, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, setIsCartOpen } = useCart();

  const checkPincode = () => {
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setDeliveryMessage("Please enter a valid 6-digit pincode");
      return;
    }
    // All India pincodes are valid (110001-855126)
    const pincodeNum = parseInt(pincode);
    if (pincodeNum >= 110001 && pincodeNum <= 855126) {
      setDeliveryMessage("✓ Delivery available! Expected delivery in 3-5 business days");
    } else {
      setDeliveryMessage("Please enter a valid Indian pincode");
    }
  };

  // Mock product data - in real app, fetch by ID
  const products = [
    { id: 1, title: "Oversized Black T-Shirt", price: "₹1,499", image: "/product1.jpg", category: "T-Shirt", description: "Crafted from premium 100% cotton with a 200 GSM weight, this oversized black t-shirt delivers unmatched comfort and durability. The relaxed drop-shoulder fit and extended length create the perfect streetwear silhouette. Pre-washed for softness and designed to maintain its shape wash after wash." },
    { id: 2, title: "Oversized White Hoodie", price: "₹2,499", image: "/product2.jpg", category: "Hoodie", description: "Experience ultimate comfort with our ultra-soft fleece hoodie featuring a premium 320 GSM fabric. The oversized fit includes a spacious kangaroo pocket, adjustable drawstrings, and ribbed cuffs for the perfect fit. Designed for all-day wear, this hoodie combines style with functionality." },
    { id: 3, title: "Oversized Grey T-Shirt", price: "₹1,499", image: "/product3.jpg", category: "T-Shirt", description: "A wardrobe essential in classic grey, this oversized t-shirt features a premium cotton blend that's soft, breathable, and built to last. The minimalist design makes it incredibly versatile - dress it up or down. Perfect for layering or wearing solo." },
    { id: 4, title: "Oversized Black Hoodie", price: "₹2,699", image: "/product1.jpg", category: "Hoodie", description: "Engineered with heavy-weight 350 GSM fleece, this black hoodie is built for those who demand quality. The oversized silhouette provides maximum comfort while the reinforced stitching ensures long-lasting durability. Features a lined hood and premium YKK zippers." },
    { id: 5, title: "Oversized Graphic T-Shirt", price: "₹1,699", image: "/product2.jpg", category: "T-Shirt", description: "Make a bold statement with our exclusive graphic print featuring high-quality puff printing on premium cotton. The oversized fit and unique design set you apart from the crowd. Limited edition artwork that speaks to the bold and confident." },
    { id: 6, title: "Oversized Beige Hoodie", price: "₹2,599", image: "/product3.jpg", category: "Hoodie", description: "Versatility meets comfort in this neutral beige hoodie. The carefully selected shade pairs effortlessly with any outfit. Crafted from soft fleece with an oversized fit, it's your go-to piece for creating elevated streetwear looks." },
    { id: 7, title: "Oversized Navy T-Shirt", price: "₹1,599", image: "/product1.jpg", category: "T-Shirt", description: "Deep navy blue meets premium quality in this essential oversized t-shirt. The rich color is achieved through superior dyeing techniques that resist fading. Heavyweight cotton construction ensures this piece becomes a long-term favorite in your rotation." },
    { id: 8, title: "Oversized Olive Hoodie", price: "₹2,799", image: "/product2.jpg", category: "Hoodie", description: "Inspired by military aesthetics, this olive hoodie combines rugged style with premium comfort. The unique colorway and oversized fit create a distinctive look. Built with reinforced seams and quality hardware for those who appreciate attention to detail." },
  ];

  const product = products.find((p) => p.id === parseInt(params.id as string));

  if (!product) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button onClick={() => router.push("/shop")} className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
      category: product.category,
    });
    setIsCartOpen(true);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-black pt-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider mb-8 text-gray-600">
          <button onClick={() => router.push("/")} className="hover:text-black">HOME</button>
          <span className="mx-2">/</span>
          <button onClick={() => router.push("/shop")} className="hover:text-black">ALL PRODUCTS</button>
          <span className="mx-2">/</span>
          <span className="text-black">{product.title.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6 items-start">
          {/* Left Column - Product Information (Sticky on desktop only) */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">{product.title}</h1>
              <p className="text-xl font-semibold">{product.price}</p>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">DESCRIPTION</h3>
              <p className="text-sm leading-relaxed text-gray-700">{product.description}</p>
              <p className="text-sm leading-relaxed text-gray-700 mt-3">
                Crafted from 100% premium cotton and stitched for durability. 
                This oversized {product.category.toLowerCase()} offers a relaxed fit that's perfect for layering or wearing solo. 
                The heavyweight fabric ensures it holds its shape wash after wash.
              </p>
            </div>

            {/* Details Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">DETAILS</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>FABRIC: 100% COTTON</p>
                <p>WEIGHT: 200 GSM</p>
                <p>PRINT: PUFF PRINT</p>
                <p>REVERSE WASH ONLY</p>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Images (Natural Page Scroll) */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={`${product.title} view ${i}`}
                  fill
                  className="object-cover"
                  priority={i === 1}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Size, Pricing & Actions */}
          <div className="space-y-6 lg:sticky lg:top-56 lg:self-start h-fit">
            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider">SIZE</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs uppercase tracking-wider hover:underline"
                >
                  SIZE CHART
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-bold uppercase border transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Gift Card Checkbox */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="giftcard" className="w-4 h-4" />
              <label htmlFor="giftcard" className="text-xs uppercase tracking-wider cursor-pointer">
                I HAVE A GIFT CARD?
              </label>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="bg-white border-2 border-black py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="bg-black text-white py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>
            </div>

            {/* Delivery Details */}
            <div className="border-t pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">DELIVERY DETAILS</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setPincode(value);
                    setDeliveryMessage("");
                  }}
                  placeholder="ENTER YOUR PINCODE" 
                  className="flex-1 border border-gray-300 px-3 py-2.5 text-xs uppercase focus:outline-none focus:border-black"
                  maxLength={6}
                />
                <button 
                  onClick={checkPincode}
                  className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition"
                >
                  CHECK
                </button>
              </div>
              {deliveryMessage && (
                <p className={`text-xs mt-2 ${deliveryMessage.includes("✓") ? "text-green-600" : "text-red-600"}`}>
                  {deliveryMessage}
                </p>
              )}
            </div>

            {/* Shipping Section */}
            <div className="border-t pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">SHIPPING</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>PACKED WITHIN 24 HOURS</p>
                <p>FREE DELIVERY PAN-INDIA</p>
                <p>DISPATCHES NEXT DAY</p>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="mt-20 border-t pt-16">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter((p) => p.id !== product.id).slice(0, 4).map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => router.push(`/shop/${item.id}`)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium uppercase">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.category}</p>
                <p className="text-sm font-semibold mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-2">Size Guide - Oversized Fit</h2>
            <p className="text-sm text-gray-600 mb-6">All measurements in inches</p>
            
            {/* T-Shirt Size Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">T-Shirts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 border-b font-semibold">Size</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Chest</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Length</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Shoulder</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">S</td>
                      <td className="py-3 px-4">42</td>
                      <td className="py-3 px-4">28</td>
                      <td className="py-3 px-4">20</td>
                      <td className="py-3 px-4">8.5</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">M</td>
                      <td className="py-3 px-4">44</td>
                      <td className="py-3 px-4">29</td>
                      <td className="py-3 px-4">21</td>
                      <td className="py-3 px-4">9</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">L</td>
                      <td className="py-3 px-4">46</td>
                      <td className="py-3 px-4">30</td>
                      <td className="py-3 px-4">22</td>
                      <td className="py-3 px-4">9.5</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">XL</td>
                      <td className="py-3 px-4">48</td>
                      <td className="py-3 px-4">31</td>
                      <td className="py-3 px-4">23</td>
                      <td className="py-3 px-4">10</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">XXL</td>
                      <td className="py-3 px-4">50</td>
                      <td className="py-3 px-4">32</td>
                      <td className="py-3 px-4">24</td>
                      <td className="py-3 px-4">10.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hoodie Size Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Hoodies</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 border-b font-semibold">Size</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Chest</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Length</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Shoulder</th>
                      <th className="text-left py-3 px-4 border-b font-semibold">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">S</td>
                      <td className="py-3 px-4">44</td>
                      <td className="py-3 px-4">27</td>
                      <td className="py-3 px-4">21</td>
                      <td className="py-3 px-4">24</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">M</td>
                      <td className="py-3 px-4">46</td>
                      <td className="py-3 px-4">28</td>
                      <td className="py-3 px-4">22</td>
                      <td className="py-3 px-4">25</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">L</td>
                      <td className="py-3 px-4">48</td>
                      <td className="py-3 px-4">29</td>
                      <td className="py-3 px-4">23</td>
                      <td className="py-3 px-4">26</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">XL</td>
                      <td className="py-3 px-4">50</td>
                      <td className="py-3 px-4">30</td>
                      <td className="py-3 px-4">24</td>
                      <td className="py-3 px-4">27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">XXL</td>
                      <td className="py-3 px-4">52</td>
                      <td className="py-3 px-4">31</td>
                      <td className="py-3 px-4">25</td>
                      <td className="py-3 px-4">28</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fit Guide */}
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h4 className="font-semibold mb-2 text-sm">Fit Guide</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>Oversized Fit:</strong> Designed to be relaxed with a drop shoulder</li>
                <li>• <strong>True to Size:</strong> 85% of customers buy their regular size</li>
                <li>• <strong>Size Up:</strong> For an even more relaxed fit</li>
                <li>• <strong>Model Info:</strong> 6'0" wearing size M</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg mb-6">
              <p className="text-xs text-gray-700">
                <strong>📏 How to Measure:</strong> Lay garment flat and measure across. Chest = armpit to armpit × 2. Length = top of shoulder to bottom hem. All measurements ±1 inch.
              </p>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-semibold"
            >
              Got It!
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
