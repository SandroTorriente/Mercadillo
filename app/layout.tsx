import './globals.css';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Mercadillo - Tienda Online",
  description: "Visualización, reserva y entrega de productos desde diferentes puntos de venta físicos",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="inter-font-fallback">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

