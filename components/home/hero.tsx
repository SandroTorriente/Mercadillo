"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg",
    "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
      ))}
      
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-white max-w-2xl"
        >
          Descubre productos locales con entrega a domicilio
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-white/90 max-w-xl"
        >
          Conectamos tiendas locales con clientes a través de mensajeros independientes para brindarte la mejor experiencia de compra
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link href="/productos">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explorar Productos
            </Button>
          </Link>
          <Link href="/como-funciona">
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Cómo Funciona
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}