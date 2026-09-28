import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport = {
  themeColor: "#0A0A0A",
};

export const metadata = {
  title: "Throttle Pitstop | Motorcycle Gear & Repairs, Karen, Nairobi",
  description:
    "Throttle Pitstop is Karen's stop for motorcycle gear, helmets, jackets, boots, and repairs. Visit us at Anwar Center, Karen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags that JS is running, so scroll-reveal styles only hide content when they can reveal it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-body bg-white text-throttle-ink">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
