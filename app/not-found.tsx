import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-black mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/">
            <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
