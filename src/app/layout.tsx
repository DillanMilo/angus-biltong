import type { Metadata } from "next";
import {
  Bebas_Neue,
  Lora,
  Roboto_Condensed,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "./cart/cartContext";

// Safari Lodge Luxury Typography
const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Angus Biltong | Authentic South African Biltong",
  description: "Premium South African biltong & droëwors, crafted in Houston with 20+ years of family tradition. Taste the heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${lora.variable} ${robotoCondensed.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
