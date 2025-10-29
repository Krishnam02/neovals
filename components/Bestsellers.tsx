import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Corduroy Shirt Olive",
    image: "/hero.jpg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Corduroy Shirt Brown",
    image: "/hero.jpg",
    tag: "Best Seller",
  },
  {
    id: 3,
    name: "Corduroy Shirt Black",
    image: "/hero.jpg",
    tag: "Best Seller",
  },
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold tracking-wide uppercase">
            Best Sellers
          </h2>
          <a
            href="#"
            className="text-gray-600 text-sm flex items-center hover:underline"
          >
            Explore the shop <span className="ml-1">→</span>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white shadow-sm hover:shadow-md transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={700}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase">
                {product.tag}
              </span>
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
