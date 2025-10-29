import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import { CartProvider } from "@/lib/cartContext";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEOVALS",
  description: "Premium Fashion Collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${playfair.className} ${inter.className}`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
